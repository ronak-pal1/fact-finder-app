// @desc    Authenticate or register user via Google SSO
// @route   POST /api/auth/google
// @access  Public
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import { v4 as uuidv4 } from "uuid";
import {
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";
import { generateAuthTokens } from "../../utils/jwt.util";
import { Learner } from "../../types/learner.type";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = asyncHandler(async (req: Request, res: Response) => {
  const { idToken } = req.body;

  if (!idToken) {
    res.status(400);
    throw new Error("No ID token provided");
  }

  // ✅ Verify Google ID token
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    res.status(400);
    throw new Error("Google login failed: no email");
  }

  // ✅ Check if user exists by email
  const params = {
    TableName: "Leaners",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: marshall({
      ":email": payload.email,
    }),
  };

  const result = await ddb.send(new QueryCommand(params));

  let learner: Learner;
  if (!result.Items || result.Items.length === 0) {
    // New learner → create
    const learnerId = uuidv4();
    learner = {
      id: learnerId,
      name: payload.name || "No Name",
      email: payload.email,
      password: "",
      designation: "",
      address: "",
      number: "",
      company:"",
      otp:"",
      tlsi:"",
      role: "learner",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await ddb.send(
      new PutItemCommand({
        TableName: "Learners",
        Item: marshall(learner),
      })
    );
  } else {
    learner = unmarshall(result.Items[0]) as Learner;
  }

  // ✅ Generate your own JWTs
  const { accessToken, refreshToken } = generateAuthTokens(learner.id);

  // ✅ Store refresh token
  await ddb.send(
    new UpdateItemCommand({
      TableName: "Learners",
      Key: marshall({ id: learner.id }),
      UpdateExpression: "SET refreshToken = :refreshToken, updatedAt = :updatedAt",
      ExpressionAttributeValues: marshall({
        ":refreshToken": refreshToken,
        ":updatedAt": new Date().toISOString(),
      }),
    })
  );

  // ✅ Return response
  const { password: pw, refreshToken: rt, ...learnerWithoutPassword } = learner;

  res.status(200).json({
    ...learnerWithoutPassword,
    accessToken,
    refreshToken,
    expiresIn: 15 * 60,
  });
});
