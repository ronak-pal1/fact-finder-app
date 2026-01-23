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

// @desc    Upload video (Metadata only + file handling mockup)
// @route   POST /api/v1/admin/videos/upload
// @access  Private/Admin
export const uploadVideo = asyncHandler(async (req: Request, res: Response) => {
  // In a real app, this would use multer-s3 or handle file stream to S3
  // Here we'll assume the file middleware processed it or we just create an entry

  // If using multer, req.file would exist.
  // Assuming for this task we just simulating metadata creation or receiving a URL
  const { title, url, duration } = req.body; // or req.file location

  // If actual file upload is needed, we'd need 'multer'. I'll assume standard metadata creation for now.

  const id = uuidv4();
  const video = {
    id,
    title: title || "Untitled Video",
    url: url || "", // S3 URL would go here
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
