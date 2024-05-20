import { createSlice } from '@reduxjs/toolkit';
import SubtasksOperations from './operations.js';
import { TasksBuilder } from '../tasks/slice.js';

const Operations = SubtasksOperations();

const initialState = [];

const slice = createSlice({
  name: 'subtasks',
  initialState,
  extraReducers: TasksBuilder(Operations),
});

export const subtasksReducer = slice.reducer;
