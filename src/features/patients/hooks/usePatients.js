const mockPatients = [
  { id: '1', firstName: 'Chloe',   lastName: 'Wilson',  email: 'chloe@example.com',  phone: '+1 555 0101', status: 'active' },
  { id: '2', firstName: 'Marcus',  lastName: 'Reed',    email: 'marcus@example.com', phone: '+1 555 0102', status: 'active' },
  { id: '3', firstName: 'Bessie',  lastName: 'Cooper',  email: 'bessie@example.com', phone: '+1 555 0103', status: 'critical' },
  { id: '4', firstName: 'James',   lastName: 'Carter',  email: 'james@example.com',  phone: '+1 555 0104', status: 'inactive' },
  { id: '5', firstName: 'Sophia',  lastName: 'Turner',  email: 'sophia@example.com', phone: '+1 555 0105', status: 'active' },
  { id: '6', firstName: 'Liam',    lastName: 'Brooks',  email: 'liam@example.com',   phone: '+1 555 0106', status: 'discharged' },
];

const usePatients = () => ({
  patients:     mockPatients,
  selected:     null,
  total:        mockPatients.length,
  status:       'success',
  error:        null,
  isLoading:    false,
  fetchPatient: () => {},
  addPatient:   () => {},
  editPatient:  () => {},
  removePatient:() => {},
  clearSelected:() => {},
});

export default usePatients;
