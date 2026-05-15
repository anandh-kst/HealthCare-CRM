import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@components/shared/PageHeader';
import Button from '@components/ui/Button';
import Spinner from '@components/ui/Spinner';
import { usePatients } from '@features/patients';
import { ROUTES } from '@constants/routes.constants';

const PatientDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selected, isLoading, fetchPatient } = usePatients();

  useEffect(() => { fetchPatient(id); }, [id]);

  if (isLoading) return <Spinner />;
  if (!selected) return null;

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${selected.firstName} ${selected.lastName}`}
        subtitle={selected.email}
        actions={<Button variant="outline" onClick={() => navigate(ROUTES.PATIENTS)}>← Back</Button>}
      />
    </div>
  );
};

export default PatientDetailPage;
