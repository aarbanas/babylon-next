import { CertificateTypeEnum } from "../enums/certificate-types.enum";

export interface CertificateModel {
  id: string;
  type: CertificateTypeEnum;
  validTill: Date;
}
