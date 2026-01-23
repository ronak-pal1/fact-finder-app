import { apiClient } from "../../api/api.client";

export interface UploadResponse {
  url: string;
}

class LearnerService {
  public async uploadDocument(
    fileUri: string,
    mimeType: string,
  ): Promise<UploadResponse> {
    const formData = new FormData();
    const filename = fileUri.split("/").pop() || "document.jpg";

    // valid way to append file in React Native / Expo
    formData.append("file", {
      uri: fileUri,
      name: filename,
      type: mimeType,
    } as any);

    const response = await apiClient.upload<UploadResponse>(
      "/learner/upload-doc",
      formData,
    );
    return response.data;
  }
}

export const learnerService = new LearnerService();
