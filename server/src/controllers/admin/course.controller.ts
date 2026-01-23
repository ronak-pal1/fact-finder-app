import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import asyncHandler from "../../utils/asyncHandler";
import { ddb } from "../../db/connect.db";
import { uploadToS3 } from "../../utils/s3.util";

// @desc    Get all courses
// @route   GET /api/v1/admin/courses
// @access  Private/Admin
export const getAllCourses = asyncHandler(
  async (req: Request, res: Response) => {
    const params = {
      TableName: "courses",
    };

    const result = await ddb.send(new ScanCommand(params));
    const courses = result.Items
      ? result.Items.map((item) => unmarshall(item))
      : [];

    res.json(courses);
  },
);

// @desc    Get course by ID
// @route   GET /api/v1/admin/courses/:id
// @access  Private/Admin
export const getCourseById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const params = {
      TableName: "courses",
      Key: marshall({ id }),
    };

    const result = await ddb.send(new GetItemCommand(params));

    if (!result.Item) {
      res.status(404);
      throw new Error("Course not found");
    }

    res.json(unmarshall(result.Item));
  },
);

// @desc    Create new course
// @route   POST /api/v1/admin/courses
// @access  Private/Admin
export const createCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, price, description } = req.body;
    let thumbnail = req.body.thumbnail;

    // Handle thumbnail upload if file is present
    if (req.file) {
      thumbnail = await uploadToS3(req.file, "course-thumbnails");
    }

    const id = uuidv4();

    const course = {
      id,
      title,
      price,
      description,
      thumbnail: thumbnail || "",
      sections: [], // Initialize empty sections
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await ddb.send(
      new PutItemCommand({
        TableName: "courses",
        Item: marshall(course),
      }),
    );

    res.status(201).json(course);
  },
);

// @desc    Update course
// @route   PUT /api/v1/admin/courses/:id
// @access  Private/Admin
export const updateCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, price, description, thumbnail } = req.body;

    // Construct UpdateExpression dynamically based on provided fields
    let updateExpression = "SET updatedAt = :updatedAt";
    const expressionAttributeValues: any = {
      ":updatedAt": new Date().toISOString(),
    };

    if (title) {
      updateExpression += ", title = :title";
      expressionAttributeValues[":title"] = title;
    }
    if (price) {
      updateExpression += ", price = :price";
      expressionAttributeValues[":price"] = price;
    }
    if (description) {
      updateExpression += ", description = :description";
      expressionAttributeValues[":description"] = description;
    }
    if (thumbnail) {
      updateExpression += ", thumbnail = :thumbnail";
      expressionAttributeValues[":thumbnail"] = thumbnail;
    }

    const params = {
      TableName: "courses",
      Key: marshall({ id }),
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: marshall(expressionAttributeValues),
      ReturnValues: "ALL_NEW" as const,
    };

    const result = await ddb.send(new UpdateItemCommand(params));

    res.json(unmarshall(result.Attributes!));
  },
);

// @desc    Delete course
// @route   DELETE /api/v1/admin/courses/:id
// @access  Private/Admin
export const deleteCourse = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    await ddb.send(
      new DeleteItemCommand({
        TableName: "courses",
        Key: marshall({ id }),
      }),
    );

    res.json({ message: "Course deleted" });
  },
);

// @desc    Add section to course
// @route   POST /api/v1/admin/courses/:courseId/sections
// @access  Private/Admin
export const addSection = asyncHandler(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { title } = req.body;
  const sectionId = uuidv4();

  const newSection = {
    id: sectionId,
    title,
    videos: [],
  };

  const params = {
    TableName: "courses",
    Key: marshall({ id: courseId }),
    UpdateExpression:
      "SET sections = list_append(if_not_exists(sections, :empty_list), :newSection)",
    ExpressionAttributeValues: marshall({
      ":newSection": [newSection],
      ":empty_list": [],
    }),
    ReturnValues: "ALL_NEW" as const,
  };

  const result = await ddb.send(new UpdateItemCommand(params));
  res.json(unmarshall(result.Attributes!).sections);
});

// @desc    Add video to section
// @route   POST /api/v1/admin/sections/:sectionId/videos
// @access  Private/Admin
export const addVideoToSection = asyncHandler(
  async (req: Request, res: Response) => {
    const { courseId, sectionId } = req.params;
    const { title, videoUrl, duration } = req.body;

    // First: Get the course
    const getParams = {
      TableName: "courses",
      Key: marshall({ id: courseId }),
    };
    const courseResult = await ddb.send(new GetItemCommand(getParams));
    if (!courseResult.Item) {
      res.status(404);
      throw new Error("Course not found");
    }
    const course = unmarshall(courseResult.Item);

    // Find section index
    const sectionIndex = course.sections.findIndex(
      (s: any) => s.id === sectionId,
    );

    if (sectionIndex === -1) {
      res.status(404);
      throw new Error("Section not found");
    }

    const newVideo = {
      id: uuidv4(),
      title,
      videoUrl,
      duration,
    };

    const params = {
      TableName: "courses",
      Key: marshall({ id: courseId }),
      UpdateExpression: `SET sections[${sectionIndex}].videos = list_append(if_not_exists(sections[${sectionIndex}].videos, :empty_list), :newVideo)`,
      ExpressionAttributeValues: marshall({
        ":newVideo": [newVideo],
        ":empty_list": [],
      }),
      ReturnValues: "UPDATED_NEW" as const,
    };

    await ddb.send(new UpdateItemCommand(params));
    res.json(newVideo);
  },
);
