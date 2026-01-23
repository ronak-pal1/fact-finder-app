import { Request, Response } from "express";
import {
  ScanCommand,
  GetItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";

// @desc    Get all users
// @route   GET /api/v1/admin/users
// @access  Private/Admin
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const result = await ddb.send(
    new ScanCommand({
      TableName: "learners",
      // ProjectionExpression: "id, name, email, phone, kycStatus, createdAt" // Optional: fetch only needed fields
    }),
  );

  const users = result.Items
    ? result.Items.map((item) => unmarshall(item))
    : [];

  // Filter out sensitive data if needed
  const safeUsers = users.map((user) => {
    const { password, refresh_token, ...rest } = user;
    return rest;
  });

  res.json(safeUsers);
});

// @desc    Get User KYC
// @route   GET /api/v1/admin/users/:userId/kyc
// @access  Private/Admin
export const getUserKYC = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const result = await ddb.send(
    new GetItemCommand({
      TableName: "learners",
      Key: marshall({ id: userId }),
    }),
  );

  if (!result.Item) {
    res.status(404);
    throw new Error("User not found");
  }

  const user = unmarshall(result.Item);

  // Return user info + kyc docs
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
    kycStatus: user.kycStatus || "pending",
    documents: user.kycDocuments || {}, // assuming kycDocuments is a map/object in DB
  });
});

// @desc    Approve KYC
// @route   POST /api/v1/admin/users/:userId/kyc/approve
// @access  Private/Admin
export const approveKYC = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const params = {
    TableName: "learners",
    Key: marshall({ id: userId }),
    UpdateExpression: "SET kycStatus = :status, kycVerifiedAt = :date",
    ExpressionAttributeValues: marshall({
      ":status": "verified",
      ":date": new Date().toISOString(),
    }),
  };

  await ddb.send(new UpdateItemCommand(params));
  res.json({ message: "KYC Approved" });
});

// @desc    Reject KYC
// @route   POST /api/v1/admin/users/:userId/kyc/reject
// @access  Private/Admin
export const rejectKYC = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { reason } = req.body;

  const params = {
    TableName: "learners",
    Key: marshall({ id: userId }),
    UpdateExpression: "SET kycStatus = :status, kycRejectionReason = :reason",
    ExpressionAttributeValues: marshall({
      ":status": "rejected",
      ":reason": reason || "Documents invalid",
    }),
  };

  await ddb.send(new UpdateItemCommand(params));
  res.json({ message: "KYC Rejected" });
});
