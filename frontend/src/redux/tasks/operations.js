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
      const responseData = await API.tasks.addTask(data);

      toast.success('The task has been added');

      return responseData;
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const updateById = createAsyncThunk('tasks/updateById', async ({
  id,
  data,
}, { rejectWithValue }) => {
  try {
    await API.tasks.updateById(id, data);

    toast.success('The task has been updated');

    return {
      id,
    };
  } catch (e) {
    toast.error(e.response.data.message);
    return rejectWithValue(e);
  }
});

const deleteById = createAsyncThunk('tasks/deleteById',
  async (id, { rejectWithValue }) => {
    try {
      await API.tasks.deleteById(id);

      toast.success('The task has been deleted');

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
  updateById,
  deleteById,
};
