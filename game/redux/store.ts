// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import boardReducer from './boardSlice';
import squaresReducer from './squareSlice'
import playersReducer from './playersSlice'


const store = configureStore({
  reducer: {
    board: boardReducer,
    squares: squaresReducer,
    players: playersReducer
  },
});

export default store;