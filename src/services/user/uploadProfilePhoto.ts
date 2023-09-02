import { APIs, upload } from "@/shared/http-service/httpService"

const uploadProfilePhoto = async (formData: FormData) => {
  return upload<{profilePhoto: string}>(`${APIs.USER}/upload-avatar`, formData);
}

export default uploadProfilePhoto;
