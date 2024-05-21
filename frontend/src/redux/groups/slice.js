import { createSlice } from '@reduxjs/toolkit';
import { GroupsOperations } from './operations.js';

const initialState = [];

const slice = createSlice({
  name: 'groups',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(
      GroupsOperations.fetchAllGroups.fulfilled,
      (state, action) => action.payload,
    )
    .addCase(GroupsOperations.addGroup.fulfilled, (state, action) => ([
      ...state,
      action.payload,
    ]));
  },
});

export const groupsReducer = slice.reducer;
