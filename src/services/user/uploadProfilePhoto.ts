import { APIs, upload } from "@/shared/http-service/httpService"

const uploadProfilePhoto = (formData: FormData) => {
  return upload(`${APIs.USER}/upload-avatar`, formData);
}

export default uploadProfilePhoto;
