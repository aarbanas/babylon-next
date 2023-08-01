import { UserDto } from '@/services/user/dto/user.dto';
import { APIs, get } from '@/shared/http-service/httpService';

const findOne = async (id: string) => {
  return get<UserDto>(APIs.USER + `/${id}`);
};

export default findOne;
