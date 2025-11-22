import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

import { Learner } from "../../types/learner.type";

import {
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
  QueryCommandOutput,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";
import { generateAuthTokens } from "../../utils/jwt.util";
import jwt from "jsonwebtoken";
import { generateOtp, generateTlsi } from "../../utils/otp.util";
import { sendOtpEmail } from "../../services/email/send.resend";

// Token expiration times (in seconds)
const ACCESS_TOKEN_EXPIRES_IN = 15 * 60; // 15 minutes

// @desc    Register a new learner
// @route   POST /api/v1/learner/register
// @access  Public
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, company, designation, address, phone,  email, password } = req.body;

  // Check if learner exists
  const checkUserParams = {
    TableName: "learners",
    IndexName: "email-index", // Assuming you have a GSI on email
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: marshall({
      ":email": email,
    }),
  };

  const { Items } = await ddb.send(new QueryCommand(checkUserParams));

  if (Items && Items.length > 0) {
    res.status(400);
    throw new Error("Learner with this email already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create learner
  const learnerId = uuidv4();
  const tlsi = generateTlsi();
  const otp = generateOtp();

  const { accessToken, refreshToken } = generateAuthTokens(learnerId);

  const learner = {
    id: learnerId,
    name,
    company,
    designation,
    address,
    phone,
    email,
    otp,
    tlsi,
    password: hashedPassword,
    role: "learner",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accessToken,
    refreshToken
  };

  const params = {
    TableName: "learners",
    Item: marshall(learner),
  };

  await ddb.send(new PutItemCommand(params));


  // await sendOtpEmail(email, otp, "Your OTP for registering to Fact Finder App is " + otp, name.split(" ")[0]);

  // Remove sensitive data from response
  const { password: learnerPassword, ...learnerWithoutPassword } = learner as Learner;

  res.status(201).json({
    ...learnerWithoutPassword,
    tlsi,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    accessToken,
    refreshToken,
  });
});

// @desc    Authenticate learner & get token
// @route   POST /api/v1/learner/login
// @access  Public
export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find learner by email
  const params = {
    TableName: "learners",
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

  const learner = unmarshall(result.Items[0]) as any;

  // Check password
  const isMatch = await bcrypt.compare(password, learner.password);

  if (!isMatch) {
    res.status(401);
    throw new Error("Invalid email or password");
  }

  // Generate tokens
  const otp = generateOtp();
  const tlsi = generateTlsi();
  const { accessToken, refreshToken } = generateAuthTokens(learner.id);

  // Update refresh token in database
  const updateParams = {
    TableName: "learners",
    Key: marshall({ id: learner.id }),
    UpdateExpression: "SET #otp = :otp, #tlsi = :tlsi, #accessToken = :accessToken, #refreshToken = :refreshToken",
    ExpressionAttributeNames: {
      "#otp": "otp",
      "#tlsi": "tlsi",
      "#accessToken": "accessToken",
      "#refreshToken": "refreshToken",
    },
    ExpressionAttributeValues: marshall({
      ":otp": otp,
      ":tlsi": tlsi,
      ":accessToken": accessToken,
      ":refreshToken": refreshToken,
    }),
  };

  await ddb.send(new UpdateItemCommand(updateParams));

  // await sendOtpEmail(email, otp, "Your OTP for logging in to Aries fitness app is " + otp, learner.name.split(" ")[0]);

  // Remove sensitive data from response
  const { password: learnerPassword, ...learnerWithoutPassword } = learner;

  res.json({
    ...learnerWithoutPassword,
    tlsi,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    accessToken,
    refreshToken,
  });
});

// @desc    Refresh access token
// @route   POST /api/v1/learner/refresh-token
// @access  Public
export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    // Get refresh token from cookie
    const refreshToken = req.cookies.refreshToken;

    // Check if refresh token exists
    if (!refreshToken) {
      res.status(401);
      throw new Error("No refresh token provided");
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { id: string };

      // Get learner from database
      const result = (await ddb.send(
        new QueryCommand({
          TableName: "learners",
          IndexName: "id-index",
          KeyConditionExpression: "id = :id",
          ExpressionAttributeValues: marshall({
            ":id": decoded.id,
          }),
        })
      )) as QueryCommandOutput;

      if (!result.Items || result.Items.length === 0) {
        res.status(404);
        throw new Error("Learner not found");
      }

      const learner = unmarshall(result.Items[0]) as Learner;

      // Verify refresh token matches the one stored in database
      if (learner.refreshToken !== refreshToken) {
        res.status(403);
        throw new Error("Invalid refresh token");
      }

      // Generate new tokens
      const otp = generateOtp();
      const tlsi = generateTlsi();

      // Update refresh token in database
      const updateParams = {
        TableName: "learners",
        Key: marshall({ id: learner.id }),
        UpdateExpression:
          "SET updatedAt = :updatedAt, otp = :otp, tlsi = :tlsi",
        ExpressionAttributeValues: marshall({
          ":updatedAt": new Date().toISOString(),
          ":otp": otp,
          ":tlsi": tlsi,
        }),
      };

      await ddb.send(new UpdateItemCommand(updateParams));

      const {
        password: learnerPassword,
        refreshToken: learnerRefreshToken,
        otp: learnerOtp,
        tlsi: learnerTlsi,
        ...learnerWithoutPassword
      } = learner;

      // Return new tokens in response
      res.status(200).json({
        message: "Token refreshed successfully",
        expiresIn: ACCESS_TOKEN_EXPIRES_IN,
        ...learnerWithoutPassword,
        tlsi,
      });
    } catch (error) {
      // Clear tokens from response

      if (error instanceof jwt.TokenExpiredError) {
        res.status(401);
        throw new Error("Refresh token expired");
      }

      res.status(401);
      throw new Error("Invalid refresh token");
    }
  }
);

// @desc    Verify OTP
// @route   POST /api/v1/learner/verify-otp
// @access  Public
export const verifyOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp, tlsi } = req.body;

  // Find learner by email
  const params = {
    TableName: "learners",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: marshall({
      ":email": email,
    }),
  };

  const result = await ddb.send(new QueryCommand(params));

  if (!result.Items || result.Items.length === 0) {
    res.status(404);
    throw new Error("Learner not found");
  }

  const learner = unmarshall(result.Items[0]) as Learner;

  console.log(learner.otp, learner.tlsi);

  // Verify OTP
  if (
    learner.otp !== otp &&
    learner.tlsi !== tlsi &&
    learner.otp !== "" &&
    learner.tlsi !== ""
  ) {
    res.status(401);
    throw new Error("Invalid OTP");
  }

  // Generate tokens
  const { accessToken, refreshToken } = generateAuthTokens(learner.id);

  // Update refresh token in database
  const updateParams = {
    TableName: "learners",
    Key: marshall({ id: learner.id }),
    UpdateExpression:
      "SET refreshToken = :refreshToken, updatedAt = :updatedAt, otp = :otp, tlsi = :tlsi",
    ExpressionAttributeValues: marshall({
      ":refreshToken": refreshToken,
      ":updatedAt": new Date().toISOString(),
      ":otp": "",
      ":tlsi": "",
    }),
  };

  await ddb.send(new UpdateItemCommand(updateParams));

  // Return new tokens in response
  res.status(200).json({
    message: "OTP verified successfully",
    accessToken,
    refreshToken,
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    tlsi,
  });
});


export const resendOtp = asyncHandler(async (req: Request, res: Response) => {
  const { email, tlsi:oldTlsi } = req.body;

  // Find learner by email
  const params = {
    TableName: "learners",
    IndexName: "email-index",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: marshall({
      ":email": email,
    }),
  };
  
  const result = await ddb.send(new QueryCommand(params));

  if (!result.Items || result.Items.length === 0) {
    res.status(404);
    throw new Error("Learner not found");
  }

  const learner = unmarshall(result.Items[0]) as Learner;


  if(learner.tlsi !== "" && learner.tlsi !== oldTlsi){
    res.status(401).json({
      message: "Invalid TLSI"
    });

    return;
  }

  // Generate OTP
  const otp = generateOtp();
  const tlsi = generateTlsi();

  // Update refresh token in database
  const updateParams = {
    TableName: "learners",
    Key: marshall({ id: learner.id }),
    UpdateExpression:
      "SET otp = :otp, tlsi = :tlsi",
    ExpressionAttributeValues: marshall({
      ":otp": otp,
      ":tlsi": tlsi,
    }),
  };

  await ddb.send(new UpdateItemCommand(updateParams));

  await sendOtpEmail(email, otp, "Your OTP for logging in to Fact finder app is " + otp, learner.name.split(" ")[0]);

  // Return new tokens in response
  res.status(200).json({
    message: "OTP sent successfully",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    tlsi,
  });
})