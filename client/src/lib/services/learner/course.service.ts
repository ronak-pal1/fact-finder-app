import { apiClient } from "../../api/api.client";

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  // Add other fields as needed
}

export interface CourseSection {
  id: string;
  title: string;
  description: string;
  videos: CourseVideo[];
}

export interface CourseVideo {
  id: string;
  title: string;
  videoUrl: string;
  duration: number;
}

class CourseService {
  public async getAllCourses(): Promise<Course[]> {
    const response = await apiClient.get<Course[]>("/courses");
    return response.data;
  }

  public async getCourseById(
    id: string,
  ): Promise<Course & { sections: CourseSection[] }> {
    const response = await apiClient.get<
      Course & { sections: CourseSection[] }
    >(`/courses/${id}`);
    return response.data;
  }
}

export const courseService = new CourseService();
