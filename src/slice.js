import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistoryFiles } from './services/API';

const initialState = {
    historyFiles: {
        value: null,
        status: 'idle',
        error: null,
    },
};

export const fetchHistoryFiles = createAsyncThunk('fetchHistoryFiles', async () => {
    console.log('Doin it');
    return await getHistoryFiles();
});

const slice = createSlice({
    name: 'mainSlice',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchHistoryFiles.pending, (state, action) => {
                state.historyFiles.status = 'loading';
            })
            .addCase(fetchHistoryFiles.fulfilled, (state, action) => {
                state.historyFiles.status = 'succeeded';
                state.historyFiles.value = action.payload;
            })
            .addCase(fetchHistoryFiles.rejected, (state, action) => {
                state.historyFiles.status = 'failed';
                state.historyFiles.error = action.error.message;
            });
    },
})


export default slice.reducer;

//export const { } = slice.actions;

export const selectHistoryFiles = (state) => state.slice.historyFiles.value;
export const selectHistoryFilesStatus = (state) => state.slice.historyFiles.status;
