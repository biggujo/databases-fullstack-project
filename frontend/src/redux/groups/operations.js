import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const fetchAllGroups = createAsyncThunk('groups/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await API.groups.fetchAllGroups();
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const addGroup = createAsyncThunk('groups/addGroup',
  async (name, { rejectWithValue }) => {
    try {
      return await API.groups.addGroup(name);
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const GroupsOperations = {
  fetchAllGroups,
  addGroup,
};
