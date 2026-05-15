import StatCard from '@components/shared/StatCard';

const StatsOverview = ({ stats }) => {
  if (!stats) return null;

  const items = [
    { label: 'Total Patients',      value: stats.totalPatients,      color: 'primary' },
    { label: 'Appointments Today',  value: stats.appointmentsToday,  color: 'secondary' },
    { label: 'Critical Cases',      value: stats.criticalCases,      color: 'danger' },
    { label: 'Discharged This Week',value: stats.dischargedThisWeek, color: 'success' },
  ];

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <StatCard key={item.label} {...item} />
      ))}
    </div>
  );
};

export default StatsOverview;
