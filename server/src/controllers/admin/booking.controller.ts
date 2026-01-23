import { Request, Response } from "express";
import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";

// @desc    Get all bookings
// @route   GET /api/v1/admin/bookings
// @access  Private/Admin
export const getAllBookings = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await ddb.send(
      new ScanCommand({
        TableName: "bookings",
      }),
    );

    const bookings = result.Items
      ? result.Items.map((item) => unmarshall(item))
      : [];
    res.json(bookings);
  },
);
