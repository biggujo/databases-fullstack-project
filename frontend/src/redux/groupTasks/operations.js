import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/api.js';
import toast from 'react-hot-toast';

const fetchAllTasks = (groupId) => createAsyncThunk('groupTasks/fetchAll',
  async (parameters, { rejectWithValue }) => {
    try {
      const urlParameters = new URLSearchParams(parameters);
      return await API.groups.tasks.fetchGroupTasksById({
        groupId,
        urlParameters,
      });
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const toggleCompletedById = (groupId) => createAsyncThunk('groupTasks/toggleCompleted',
  async (taskId, { rejectWithValue }) => {
    try {
      return await API.groups.tasks.toggleGroupTaskCompletedById({
        groupId,
        taskId,
      });
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const addTask = (groupId) => createAsyncThunk('groupTasks/addTask',
  async (data, { rejectWithValue }) => {
    try {
      const responseData = await API.groups.tasks.addGroupTask({
        groupId,
        data,
      });

      toast.success('The task has been added');

      return responseData;
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const updateById = (groupId) => createAsyncThunk('groupTasks/updateById',
  async ({
    id,
    data,
  }, { rejectWithValue }) => {
    try {
      const updatedTask = await API.groups.tasks.updateGroupTaskById({
        groupId,
        taskId: id,
        data,
      });

      toast.success('The task has been updated');

      return updatedTask;
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

const deleteById = (groupId) => createAsyncThunk('groupTasks/deleteById',
  async (taskId, { rejectWithValue }) => {
    try {
      await API.groups.tasks.deleteGroupTaskById({
        groupId,
        taskId,
      });

      toast.success('The task has been deleted');

      return {
        id: taskId,
      };
    } catch (e) {
      toast.error(e.response.data.message);
      return rejectWithValue(e);
    }
  },
);

export const GroupTasksOperations = (groupId) => ({
  fetchAllTasks: fetchAllTasks(groupId),
  toggleCompletedById: toggleCompletedById(groupId),
  addTask: addTask(groupId),
  updateById: updateById(groupId),
  deleteById: deleteById(groupId),
});
