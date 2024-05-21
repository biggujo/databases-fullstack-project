import { createSlice } from '@reduxjs/toolkit';
import { TasksBuilder } from '../tasks/slice.js';
import { GroupTasksOperations } from './operations.js';
import operations from '../auth/operations.js';

const Operations = GroupTasksOperations();

const slice = createSlice({
  name: 'groupTasks',
  initialState: [],
  extraReducers: TasksBuilder(Operations),
});

export const groupTasksReducer = slice.reducer;
