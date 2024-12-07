import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/taskSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal:modalReducer
  },
});
