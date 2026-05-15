import { combineReducers } from '@reduxjs/toolkit';
import patientsReducer from '@features/patients/store/patientsSlice';
import appointmentsReducer from '@features/appointments/store/appointmentsSlice';
import dashboardReducer from '@features/dashboard/store/dashboardSlice';

const rootReducer = combineReducers({
  patients:     patientsReducer,
  appointments: appointmentsReducer,
  dashboard:    dashboardReducer,
});

export default rootReducer;
