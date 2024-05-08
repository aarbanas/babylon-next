import { Type } from '@/app/register/types';

export type UpdateUserProfile = {
  city: string;
  firstname: string;
  lastname: string;
  phone: string;
  type: Type;
  name: string;
  street: string;
  oib: string;
  active?: boolean;
};
