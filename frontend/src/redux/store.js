import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks/slice.js';
import { authReducer } from './auth/slice.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: tasksReducer,
  },
});

export default store;
