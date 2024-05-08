import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const register = createAsyncThunk('auth/register', async ({
  username,
  password,
}, { rejectWithValue }) => {
  try {
    const data = await API.auth.register({
      username,
      password,
    });

    toast.success('Successful register');
    return data;
  } catch (e) {
    toast.error(e.response.data.message);
    return rejectWithValue(e);
  }
});

const login = createAsyncThunk('auth/login', async ({
  username,
  password,
}, { rejectWithValue }) => {
  try {
    const data = await API.auth.login({
      username,
      password,
    });

    toast.success('Successful login');
    return data;
  } catch (e) {
    toast.error(e.response.data.message);
    return rejectWithValue(e);
  }
});

const logout = createAsyncThunk('auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await API.auth.logout();

      toast.success('Successful log out');
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const UserOperations = {
  register,
  login,
  logout,
};

export default UserOperations;
