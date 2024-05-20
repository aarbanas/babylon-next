import { CertificateTypeEnum } from '@/app/profile/certificates/enums/certificate-types.enum';
import { Role, Type } from '@/app/register/types';

export type UserDto = {
  userAttributes: UserAttributesDto;
  organisationAttributes: OrganisationAttributesDto;
  id: number;
  email: string;
  active: boolean;
  role: Role;
  profilePhoto?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type UserAttributesDto = {
  id: number;
  firstname: string;
  lastname: string;
  city: string;
  phone: string;
  type: Type;
  certificates?: Certificate[];
};

export type OrganisationAttributesDto = {
  id: number;
  name: string;
  street: string;
  city: string;
  oib: string;
};

export type Certificate = {
  id: number;
  type: CertificateTypeEnum;
  validTill?: Date | null;
  active: boolean;
  key: string;
  createdAt: Date;
  updatedAt: Date;
};
