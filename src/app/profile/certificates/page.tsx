import CertificateForm from './components/certificateForm/CertificateForm';
import CertificateTable from './components/certificateTable/CertificateTable';

export default function CertificatePage() {
  return (
    <div>
      <div className="mb-5">
        <CertificateForm />
      </div>
      <div>
        <CertificateTable />
      </div>
    </div>
  );
}
