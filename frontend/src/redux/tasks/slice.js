import { createSlice } from '@reduxjs/toolkit';
import UserOperations from '../auth/operations.js';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      return [
        ...state,
        action.payload,
      ];
    },
    deleteTaskById: (state, action) => {
      return state.filter(({ id }) => action.payload !== id);
    },
    toggleCompletedById: (state, action) => {
      return state.map((task) => action.payload === task.id ? {
        ...task,
        isCompleted: !task.isCompleted,
      } : task);
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(UserOperations.logout.fulfilled, (state) => []);
  },
});

export const {
  addTask,
  deleteTaskById,
  toggleCompletedById,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
