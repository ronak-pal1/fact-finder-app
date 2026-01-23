import { Router } from "express";
import {
  createAdmin,
  login,
  logout,
} from "../../../controllers/admin/auth.controller";
import {
  addSection,
  addVideoToSection,
  createCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
} from "../../../controllers/admin/course.controller";
import {
  deleteVideo,
  getAllVideos,
  uploadVideo,
} from "../../../controllers/admin/video.controller";
import {
  approveKYC,
  getAllUsers,
  getUserKYC,
  rejectKYC,
} from "../../../controllers/admin/user.controller";
import { getAllBookings } from "../../../controllers/admin/booking.controller";
import { getDashboardStats } from "../../../controllers/admin/stats.controller";

const router = Router();

// Auth Routes
router.post("/login", login);
router.post("/logout", logout);
router.post("/create", createAdmin); // Seeding

// Course Routes
router.get("/courses", getAllCourses);
router.get("/courses/:id", getCourseById);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);
router.delete("/courses/:id", deleteCourse);
router.post("/courses/:courseId/sections", addSection);

// Special route for adding video to section (depends on how frontend calls it, usually nested under section or course)
// Based on course.controller implementation:
router.post("/courses/:courseId/sections/:sectionId/videos", addVideoToSection);

// Video Routes (Library)
router.post("/videos/upload", uploadVideo);
router.get("/videos", getAllVideos);
router.delete("/videos/:id", deleteVideo);

// User Routes
router.get("/users", getAllUsers);
router.get("/users/:userId/kyc", getUserKYC);
router.post("/users/:userId/kyc/approve", approveKYC);
router.post("/users/:userId/kyc/reject", rejectKYC);

// Booking Routes
router.get("/bookings", getAllBookings);

// Stats Routes
router.get("/stats/dashboard", getDashboardStats);

export default router;
