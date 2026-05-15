import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, fetchCurrentUser } from '../services/auth.service';
import { STATUS } from '@constants/app.constants';
import env from '@config/env.config';

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    return await loginUser(credentials);
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Login failed');
  }
});

export const fetchMe = createAsyncThunk('auth/fetchMe', async (_, { rejectWithValue }) => {
  try {
    return await fetchCurrentUser();
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || 'Session expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user:   null,
    token:  localStorage.getItem(env.TOKEN_KEY) || null,
    status: STATUS.IDLE,
    error:  null,
  },
  reducers: {
    logout: (state) => {
      state.user  = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem(env.TOKEN_KEY);
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => { state.status = STATUS.LOADING; state.error = null; })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = STATUS.SUCCESS;
        state.user   = payload.user;
        state.token  = payload.token;
        localStorage.setItem(env.TOKEN_KEY, payload.token);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.status = STATUS.ERROR;
        state.error  = payload;
      })
      .addCase(fetchMe.fulfilled, (state, { payload }) => { state.user = payload; })
      .addCase(fetchMe.rejected, (state) => { state.user = null; state.token = null; });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
