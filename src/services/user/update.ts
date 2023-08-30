import { APIs, patch } from '@/shared/http-service/httpService';
import { UpdateUserProfile } from '@/app/profile/types';

const updateUser = async (id: string, data: Partial<UpdateUserProfile>) => {
  return patch(`${APIs.USER}/${id}`, data);
};

export default updateUser;
