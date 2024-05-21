import API from '../../utils/api.js';
import toast from 'react-hot-toast';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchAllTasks = (parentId) => createAsyncThunk('subtasks/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await API.tasks.subtasks.fetchAllTasks(parentId);
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const toggleCompletedById = (parentId) => createAsyncThunk('subtasks/toggleCompleted',
  async (subtaskId, { rejectWithValue }) => {
    try {
      return await API.tasks.subtasks.toggleCompletedById({
        parentId,
        subtaskId,
      });
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const addTask = (parentId) => createAsyncThunk('subtasks/addTask',
  async (data, { rejectWithValue }) => {
    try {
      const responseData = await API.tasks.subtasks.addTask({
        parentId,
        data,
      });

      toast.success('The subtask has been added');

      return responseData;
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const updateById = (parentId) => createAsyncThunk('subtasks/updateById',
  async ({
    subtaskId,
    data,
  }, { rejectWithValue }) => {
    try {
      const updatedTask = await API.tasks.subtasks.updateById({
        parentId,
        subtaskId,
        data,
      });

      toast.success('The subtask has been updated');

      return updatedTask;
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const deleteById = (parentId) => createAsyncThunk('subtasks/deleteById',
  async (subtaskId, { rejectWithValue }) => {
    try {
      await API.tasks.subtasks.deleteById({
        parentId,
        subtaskId,
      });

      toast.success('The subtask has been deleted');

      return {
        subtaskId,
      };
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const SubtasksOperations = (parentId) => ({
  fetchAllTasks: fetchAllTasks(parentId),
  toggleCompletedById: toggleCompletedById(parentId),
  addTask: addTask(parentId),
  updateById: updateById(parentId),
  deleteById: deleteById(parentId),
});

export default SubtasksOperations;
