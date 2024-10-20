import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    message: "Welcome players. Ready Player 1?"
}

const squareSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state, action) {
            state.message = action.payload;
        }
    },
})

export const {
    updateMessage
} = squareSlice.actions;

export default squareSlice.reducer;
