import { createSlice } from '@reduxjs/toolkit';
import UserOperations from '../auth/operations.js';
import { TasksOperations } from './operations.js';

export const TasksBuilder = (Operations) => (builder) => {
  builder
  .addCase(Operations.fetchAllTasks.fulfilled,
    (state, action) => action.payload,
  )
  .addCase(Operations.addTask.fulfilled, (state, action) => [
    ...state,
    action.payload,
  ])
  .addCase(Operations.updateById.fulfilled, (state, action) => {
    const indexToUpdate = state.findIndex(({ id }) => id === action.payload.id);

    if (indexToUpdate === -1) {
      return state;
    }

    const updatedState = [...state];
    updatedState[indexToUpdate] = action.payload;

    return updatedState;
  })
  .addCase(Operations.toggleCompletedById.fulfilled, (state, action) => {
    const indexToToggle = state.findIndex(({ id }) => id === action.payload.id);

    if (indexToToggle === -1) {
      return state;
    }

    const updatedState = [...state];
    updatedState[indexToToggle] = action.payload;

    return updatedState;
  })
  .addCase(Operations.deleteById.fulfilled, (state, action) => {
    const indexToDelete = state.findIndex(({ id }) => id === action.payload.id);

    if (indexToDelete === -1) {
      return state;
    }

    const updatedState = [...state];
    updatedState.splice(indexToDelete, 1);

    return updatedState;
  })
  .addCase(UserOperations.logout.fulfilled, () => []);
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  extraReducers: TasksBuilder(TasksOperations),
});

export const tasksReducer = tasksSlice.reducer;
