import adminApi from "../../apis/adminApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
class CourseService {
  // Get all courses
  getAllCourses() {
    return adminApi.get("/courses");
  }

  // Get a specific course by ID
  getCourseById(id: string) {
    return adminApi.get(`/courses/${id}`);
  }

  // Create a new course
  createCourse(data: any) {
    return adminApi.post("/courses", data);
  }

  // Update an existing course
  updateCourse(id: string, data: any) {
    return adminApi.put(`/courses/${id}`, data);
  }

  // Delete a course
  deleteCourse(id: string) {
    return adminApi.delete(`/courses/${id}`);
  }

  // Add a section to a course
  addSection(courseId: string, data: { title: string }) {
    return adminApi.post(`/courses/${courseId}/sections`, data);
  }

  // Add a video/episode to a section
  addVideoToSection(sectionId: string, data: any) {
    return adminApi.post(`/sections/${sectionId}/videos`, data);
  }
}

export default new CourseService();
