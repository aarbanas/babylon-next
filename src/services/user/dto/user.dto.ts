import { Role } from '@/app/register/types';

export type UserDto = {
  userAttributes: UserAttributesDto;
  organisationAttributes: OrganisationAttributesDto;
  id: number;
  email: string;
  active: boolean;
  role: Role;
};

export type UserAttributesDto = {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
  type: string;
};

type OrganisationAttributesDto = {
  id: number;
  name: string;
  street: string;
  city: string;
  oib: string;
};
