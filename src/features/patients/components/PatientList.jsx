import PatientCard from './PatientCard';
import Spinner from '@components/ui/Spinner';
import EmptyState from '@components/shared/EmptyState';

const PatientList = ({ patients, isLoading, onSelect }) => {
  if (isLoading) return <Spinner />;
  if (!patients?.length) return <EmptyState message="No patients found." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {patients.map((patient) => (
        <PatientCard key={patient.id} patient={patient} onClick={onSelect} />
      ))}
    </div>
  );
};

export default PatientList;
