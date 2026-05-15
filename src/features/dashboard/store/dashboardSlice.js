import { createSlice } from '@reduxjs/toolkit';

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: { stats: null, activity: [], status: 'idle', error: null },
  reducers: {},
});

export default dashboardSlice.reducer;
