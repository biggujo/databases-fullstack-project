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

const addTask = createAsyncThunk('tasks/addTask',
  async (data, { rejectWithValue }) => {
    try {
      return await API.tasks.addTask(data);
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const deleteById = createAsyncThunk('tasks/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await API.tasks.deleteById(id);

      return {
        id,
      };
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

export const TasksOperations = {
  fetchAllTasks,
  toggleCompletedById,
  addTask,
  deleteById,
};
