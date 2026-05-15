import { useNavigate } from 'react-router-dom';
import PageHeader from '@components/shared/PageHeader';
import Button from '@components/ui/Button';
import { PatientList, usePatients } from '@features/patients';
import { ROUTES } from '@constants/routes.constants';

const PatientsPage = () => {
  const navigate = useNavigate();
  const { patients, isLoading } = usePatients();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        subtitle={`${patients.length} total patients`}
        actions={<Button onClick={() => {}}>+ Add Patient</Button>}
      />
      <PatientList
        patients={patients}
        isLoading={isLoading}
        onSelect={(p) => navigate(ROUTES.PATIENT_DETAIL(p.id))}
      />
    </div>
  );
};

export default PatientsPage;
