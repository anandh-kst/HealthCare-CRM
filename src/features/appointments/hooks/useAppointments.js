const mockAppointments = [
  { id: '1', patientName: 'Chloe Wilson',  doctor: 'Dr. Daniel Ross',  date: '2025-11-13T09:30:00', status: 'scheduled' },
  { id: '2', patientName: 'Marcus Reed',   doctor: 'Dr. Liam Taylor',  date: '2025-11-13T12:00:00', status: 'scheduled' },
  { id: '3', patientName: 'Bessie Cooper', doctor: 'Dr. Emily Parker', date: '2025-11-13T11:45:00', status: 'completed' },
  { id: '4', patientName: 'James Carter',  doctor: 'Dr. Sarah Mills',  date: '2025-11-14T10:00:00', status: 'cancelled' },
  { id: '5', patientName: 'Sophia Turner', doctor: 'Dr. Noah Evans',   date: '2025-11-14T14:30:00', status: 'scheduled' },
];

const useAppointments = () => ({
  appointments:     mockAppointments,
  total:            mockAppointments.length,
  status:           'success',
  error:            null,
  isLoading:        false,
  addAppointment:   () => {},
  editAppointment:  () => {},
  removeAppointment:() => {},
});

export default useAppointments;
