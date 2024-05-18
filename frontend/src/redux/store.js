import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tasksReducer } from './tasks/slice.js';
import { authReducer } from './auth/slice.js';
import {
  FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,
} from 'redux-persist/es/constants';
import { groupsReducer } from './groups/slice.js';
import { filtersReducer } from './filters/slice.js';
import { groupTasksReducer } from './groupTasks/slice.js';

const persistConfig = {
  key: 'counter',
  storage,
  whitelist: [
    'user',
    'isLoggedIn',
  ],
};

const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer),
    tasks: tasksReducer,
    groups: groupsReducer,
    groupTasks: groupTasksReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
      ],
    },
  }),
});

export const persistor = persistStore(store);

export default store;
