import { CertificateTypeEnum } from './enums/certificate-types.enum';
import CertificateForm from './components/certificateForm/CertificateForm';
import CertificateTable from './components/certificateTable/CertificateTable';

export default function CertificatePage() {
  return (
    <div>
      <div className="mb-5">
        <CertificateForm />
      </div>
      <div>
        <CertificateTable
          certificates={[
            {
              id: '1',
              type: CertificateTypeEnum.REDCROSS,
              validTill: new Date(),
            },
            {
              id: '1',
              type: CertificateTypeEnum.UNIVERSITY,
              validTill: new Date(),
            },
          ]}
        />
      </div>
    </div>
  );
}
