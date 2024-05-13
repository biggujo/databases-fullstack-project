import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const fetchAllTasks = createAsyncThunk('tasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await API.tasks.fetchAllTasks();
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const toggleCompletedById = createAsyncThunk('tasks/toggleCompleted',
  async (id, { rejectWithValue }) => {
    try {
      return await API.tasks.toggleCompletedById(id);
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

export const TasksOperations = {
  fetchAllTasks,
  toggleCompletedById,
};
