// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import squaresReducer from './squareSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    squares: squaresReducer
  },
});

export default store;