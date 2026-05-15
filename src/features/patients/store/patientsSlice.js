import { createSlice } from '@reduxjs/toolkit';

const patientsSlice = createSlice({
  name: 'patients',
  initialState: { list: [], selected: null, total: 0, status: 'idle', error: null },
  reducers: {},
});

export default patientsSlice.reducer;
