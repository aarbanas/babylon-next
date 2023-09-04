import { UserDto } from '@/services/user/dto/user.dto';

export type FindUsersDto = {
  data: UserDto[];
  meta: PaginationMetadata;
};

export type PaginationMetadata = {
  skip: number;
  take: number;
  count: number;
};
