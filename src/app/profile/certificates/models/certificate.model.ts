import { CertificateTypeEnum } from '../enums/certificate-types.enum';

export interface CertificateModel {
  id: number;
  type: CertificateTypeEnum;
  validTill: Date;
}

export type CreateCertificateModel = {
  type: string;
  validTill: string;
  key: string;
};
