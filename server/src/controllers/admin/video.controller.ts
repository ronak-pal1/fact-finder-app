import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";
import { uploadToS3 } from "../../utils/s3.util";

// @desc    Upload video
// @route   POST /api/v1/admin/videos/upload
// @access  Private/Admin
export const uploadVideo = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No video file uploaded");
  }

  const { title, duration } = req.body;

  // Upload to S3
  const url = await uploadToS3(req.file, "videos");

  const id = uuidv4();
  const video = {
    id,
    title: title || "Untitled Video",
    url: url,
    duration: duration || "0:00",
    uploadedAt: new Date().toISOString(),
  };

  await ddb.send(
    new PutItemCommand({
      TableName: "videos",
      Item: marshall(video),
    }),
  );

  res.status(201).json(video);
});

// @desc    Get all videos
// @route   GET /api/v1/admin/videos
// @access  Private/Admin
export const getAllVideos = asyncHandler(
  async (req: Request, res: Response) => {
    const params = {
      TableName: "videos",
    };

    const result = await ddb.send(new ScanCommand(params));
    const videos = result.Items
      ? result.Items.map((item) => unmarshall(item))
      : [];

    res.json(videos);
  },
);

// @desc    Delete video
// @route   DELETE /api/v1/admin/videos/:id
// @access  Private/Admin
export const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await ddb.send(
    new DeleteItemCommand({
      TableName: "videos",
      Key: marshall({ id }),
    }),
  );

  res.json({ message: "Video deleted" });
});
