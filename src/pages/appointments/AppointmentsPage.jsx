import PageHeader from '@components/shared/PageHeader';
import Button from '@components/ui/Button';
import DataTable from '@components/shared/DataTable';
import Badge from '@components/ui/Badge';
import { useAppointments } from '@features/appointments';
import { formatDate } from '@utils/date.utils';

const statusVariant = { scheduled: 'primary', completed: 'success', cancelled: 'danger', no_show: 'warning' };

const columns = [
  { key: 'patientName', label: 'Patient' },
  { key: 'doctor',      label: 'Doctor' },
  { key: 'date',        label: 'Date',   render: (v) => formatDate(v) },
  { key: 'status',      label: 'Status', render: (v) => <Badge label={v} variant={statusVariant[v]} /> },
];

const AppointmentsPage = () => {
  const { appointments, isLoading } = useAppointments();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Appointments"
        actions={<Button>+ New Appointment</Button>}
      />
      <DataTable
        columns={columns}
        data={appointments}
        isLoading={isLoading}
        emptyMessage="No appointments scheduled."
      />
    </div>
  );
};

export default AppointmentsPage;
