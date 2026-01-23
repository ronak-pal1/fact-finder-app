import { Request, Response } from "express";
import asyncHandler from "../../utils/asyncHandler";
import { uploadToS3 } from "../../utils/s3.util";
import { v4 as uuidv4 } from "uuid";

// @desc    Upload Document (KYC or other)
// @route   POST /api/v1/learner/upload-doc
// @access  Private
export const uploadDoc = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No file uploaded");
  }

  const { type } = req.body; // e.g., 'kyc', 'profile', etc.
  const folder = type ? `learner-docs/${type}` : "learner-docs/misc";

  const url = await uploadToS3(req.file, folder);

  res.status(201).json({
    message: "File uploaded successfully",
    url,
  });
});
