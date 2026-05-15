import { createSlice } from '@reduxjs/toolkit';

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: { list: [], total: 0, status: 'idle', error: null },
  reducers: {},
});

export default appointmentsSlice.reducer;
