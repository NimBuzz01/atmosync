import { ApiResponse } from "../types";

export const getAmbianceData = async (
  type: "blob" | "file",
  file: Blob | File
): Promise<ApiResponse> => {
  const formData = new FormData();
  if (type === "blob") {
    formData.append("video", file, "temp_video.webm");
  }
  if (type === "file") {
    formData.append("video", file);
  }

  return fetch("http://localhost:8080/api/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data as ApiResponse;
    });
};
