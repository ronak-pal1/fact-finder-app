import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import {
  QueryCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";
import { generateAuthTokens } from "../../utils/jwt.util";

// @desc    Admin Login
// @route   POST /api/v1/admin/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find admin by email
  const params = {
    TableName: "admins",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: marshall({
      ":email": email,
    }),
  };

  const result = await ddb.send(new QueryCommand(params));

  if (!result.Items || result.Items.length === 0) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  const admin = unmarshall(result.Items[0]);

  // Check password
  const isMatch = await bcrypt.compare(password, admin.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateAuthTokens(admin.id);

  // Update refresh token in database (if you want to track sessions, otherwise optional for simple JWT)
  const updateParams = {
    TableName: "admins",
    Key: marshall({ id: admin.id }),
    UpdateExpression: "SET refreshToken = :refreshToken",
    ExpressionAttributeValues: marshall({
      ":refreshToken": refreshToken,
    }),
  };

  await ddb.send(new UpdateItemCommand(updateParams));

  // Remove sensitive data
  const { password: _, ...adminWithoutPassword } = admin;

  res.json({
    ...adminWithoutPassword,
    accessToken,
    refreshToken,
  });
});

// @desc    Admin Logout
// @route   POST /api/v1/admin/logout
// @access  Private
export const logout = asyncHandler(async (req: Request, res: Response) => {
  // Client side just discards tokens, but we could invalidate refresh token here if passed
  res.json({ message: "Logged out successfully" });
});

// @desc    Create Admin (Internal use or Seeding)
// @route   POST /api/v1/admin/create
export const createAdmin = asyncHandler(async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  // Check if exists logic... (omitted for brevity, assuming similar to learner)

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const id = uuidv4();

  const admin = {
    id,
    email,
    password: hashedPassword,
    name,
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  await ddb.send(
    new PutItemCommand({
      TableName: "admins",
      Item: marshall(admin),
    }),
  );

  res.status(201).json({ message: "Admin created", id });
});
