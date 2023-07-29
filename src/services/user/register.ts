import { RegisterUserData } from '@/app/register/types';
import { APIs, post } from '@/shared/http-service/httpService';

const registerUser = async (data: RegisterUserData) => {
  return post(APIs.USER, data);
};

export default registerUser;
