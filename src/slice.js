import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistoryFiles } from './services/API';

const initialState = {
    historyFiles: {
        value: null,
        status: 'idle',
        error: null,
    },
};

export const fetchHistoryFiles = createAsyncThunk('fetchHistoryFiles', () => {
    return getHistoryFiles();
});

const slice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchHistoryFiles.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchHistoryFiles.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.value = action.payload;
            })
            .addCase(fetchHistoryFiles.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})


export default slice.reducer;

//export const { } = postsSlice.actions;

export const selectHistoryFiles = (state) => state.slice.historyFiles.value;
