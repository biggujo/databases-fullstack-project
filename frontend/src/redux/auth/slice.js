import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import UserOperations from './operations.js';

const initialState = {
  user: {
    id: null,
    username: null,
  },
  error: null,
  isLoggedIn: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: (builder) => {
    builder
    .addCase(UserOperations.logout.fulfilled, (state) => initialState)
    .addMatcher(isAnyOf(UserOperations.register.fulfilled,
        UserOperations.login.fulfilled,
      ),
      (state, action) => {
        return {
          user: {
            id: action.payload.id,
            username: action.payload.username,
          },
          error: null,
          isLoggedIn: true,
        };
      },
    )
    .addMatcher(
      isAnyOf(UserOperations.register.rejected, UserOperations.login.rejected),
      (state, action) => {
        return {
          user: {
            id: null,
            username: null,
          },
          error: action.payload,
          isLoggedIn: false,
        };
      },
    );
  },
});

export const authReducer = slice.reducer;
