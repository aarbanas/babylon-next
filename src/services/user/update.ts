import { APIs, patch } from '@/shared/http-service/httpService';
import { UpdateUserProfile } from '@/app/profile/types';
import { UserDto } from '@/services/user/dto/user.dto';

const updateUser = async (
  id: string,
  data: Partial<UpdateUserProfile>
): Promise<UserDto> => {
  return patch(`${APIs.USER}/${id}`, data);
};

export default updateUser;
