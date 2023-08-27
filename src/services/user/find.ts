import { APIs, get } from '@/shared/http-service/httpService';
import { FindUsersDto } from '@/services/user/dto/findUsers.dto';

type FindUsersQueryData = {
  page?: number;
  limit?: number;
  sort?: string;
  dir?: 'asc' | 'desc';
};

const findUsers = async (data?: FindUsersQueryData) => {
  const queryParams = [];
  let query = '';

  if (data) {
    if (data.page) queryParams.push(`page=${data.page}`);
    if (data.limit) queryParams.push(`limit=${data.limit}`);
    if (data.sort) queryParams.push(`sort=${data.sort}`);
    if (data.dir) queryParams.push(`dir=${data.dir}`);

    queryParams.forEach((param, index) => {
      if (index === 0) {
        query += `?${param}`;
      } else {
        query += `&${param}`;
      }
    });
  }

  return get<FindUsersDto>(APIs.USER + `${query}`);
};

export default findUsers;
