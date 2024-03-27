import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from './tasks/slice.js';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;
