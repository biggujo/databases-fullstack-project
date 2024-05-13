import { createSlice } from '@reduxjs/toolkit';
import UserOperations from '../auth/operations.js';
import { TasksOperations } from './operations.js';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  extraReducers: (builder) => {
    builder
    .addCase(TasksOperations.addTask.fulfilled,
      (state, action) => [
        ...state,
        action.payload,
      ],
    )
    .addCase(
      TasksOperations.fetchAllTasks.fulfilled,
      (state, action) => action.payload,
    )
    .addCase(TasksOperations.toggleCompletedById.fulfilled, (state, action) => {
      const indexToToggle = state.findIndex(({ id }) => id === action.payload.id);

      if (indexToToggle === -1) {
        return indexToToggle;
      }

      const updatedState = [...state];
      updatedState[indexToToggle] = action.payload;

      return updatedState;
    })
    .addCase(UserOperations.logout.fulfilled, () => []);
  },
});

export const tasksReducer = tasksSlice.reducer;
