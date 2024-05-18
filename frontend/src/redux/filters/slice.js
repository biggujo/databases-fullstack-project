import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groupsNameFilter: '',
};

const slice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setGroupsNameFilter: (state, action) => ({
      ...state,
      groupsNameFilter: action.payload,
    }),
    clearGroupsNameFilter: (state) => ({
      ...state,
      groupsNameFilter: '',
    }),
  },
});

export const {
  setGroupsNameFilter,
  clearGroupsNameFilter,
} = slice.actions;

export const filtersReducer = slice.reducer;
