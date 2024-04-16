import { APIs, deleteRequest } from '@/shared/http-service/httpService';

const deleteUser = async (id: string) => {
  return deleteRequest(`${APIs.USER}/${id}`);
};

export default deleteUser;
