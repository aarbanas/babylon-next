import { CertificateTypeEnum } from '../enums/certificate-types.enum';

export interface CertificateDto {
  id: number;
  type: CertificateTypeEnum;
  active: boolean;
  validTill?: Date | null;
}

export type CreateCertificateDto = {
  type: string;
  validTill: string;
  key: string;
  userId?: number;
};
