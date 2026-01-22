import adminApi from "../../apis/adminApi";

class VideoService {
  // Upload a video
  uploadVideo(formData: FormData) {
    return adminApi.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  // Get all uploaded videos
  getAllVideos() {
    return adminApi.get("/videos");
  }

  // Delete a video
  deleteVideo(id: string) {
    return adminApi.delete(`/videos/${id}`);
  }
}

export default new VideoService();
