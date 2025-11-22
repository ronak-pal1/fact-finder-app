import { Request, Response, NextFunction } from "express";
import { GetItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";
import { ddb } from "../db/connect.db";
import { verifyToken } from "../utils/jwt.util";

declare global {
  namespace Express {
    interface Request {
      learner?: any;
    }
  }
}

/**
 * Middleware to verify JWT token and attach user to request
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header or cookies
    let token = req.header("x-auth-token") || req.cookies?.accessToken;

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    // Remove 'Bearer ' prefix if present
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = verifyToken(token) as { id: string };

    // Get learner from database
    const params = {
      TableName: "learners",
      Key: marshall({ id: decoded.id }),
    };

    const { Item } = await ddb.send(new GetItemCommand(params));

    if (!Item) {
      return res.status(401).json({ message: "Learner not found" });
    }

    // Attach learner to request object
    req.learner = unmarshall(Item);
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(401).json({ message: "Token is not valid" });
  }
};

/**
 * Middleware to check if user is the owner of the resource
 * @param userIdPath - Path to the user ID in the request (e.g., 'params.userId')
 */
export const isOwner = (userIdPath: string = "params.userId") => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.learner) {
      return res.status(401).json({ message: "Authentication required" });
    }

    // Get user ID from the specified path
    const pathParts = userIdPath.split(".");
    let resourceUserId = req as any;

    for (const part of pathParts) {
      resourceUserId = resourceUserId[part];
      if (resourceUserId === undefined) {
        return res.status(400).json({ message: "Invalid user ID path" });
      }
    }

    // Check if the authenticated user is the owner
    if (req.learner.id === resourceUserId) {
      return next();
    }

    res.status(403).json({ message: "Not authorized to access this resource" });
  };
};
