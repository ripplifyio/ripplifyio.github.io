import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getHistoryFiles, getHistoryFile } from './services/API';

const initialState = {
    historyFiles: {
        value: null,
        status: 'idle',
        error: null,
    },
};

export const fetchHistoryFiles = createAsyncThunk('fetchHistoryFiles', async () => {
    return await getHistoryFiles();
});

export const fetchHistoryFile = createAsyncThunk('fetchHistoryFile', async (id) => {
    console.log('Fetching individual history file with ID=' + id);
    return await getHistoryFile(id);
});

const getEmptyHistoryFile = async () => {
    return [];
}
export const setEmptyHistoryFile = createAsyncThunk('setEmptyHistoryFile', async () => {
    console.log('Set empty history file happening');
    return await getEmptyHistoryFile();
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
            })

            .addCase(fetchHistoryFile.pending, (state, action) => {
                state.historyFiles.status = 'loading';
            })
            .addCase(fetchHistoryFile.fulfilled, (state, action) => {
                state.historyFiles.status = 'succeeded';
                state.historyFiles.value = [action.payload];
            })
            .addCase(fetchHistoryFile.rejected, (state, action) => {
                state.historyFiles.status = 'failed';
                state.historyFiles.error = action.error.message;
            })

            // TODO remove this it's a terrible solution
            .addCase(setEmptyHistoryFile.pending, (state, action) => {
                state.historyFiles.status = 'loading';
            })
            .addCase(setEmptyHistoryFile.fulfilled, (state, action) => {
                state.historyFiles.status = 'succeeded';
                state.historyFiles.value = [];
            })
            .addCase(setEmptyHistoryFile.rejected, (state, action) => {
                state.historyFiles.status = 'failed';
                state.historyFiles.error = action.error.message;
            });
    },
})


export default slice.reducer;

//export const { } = slice.actions;

export const selectHistoryFiles = (state) => state.slice.historyFiles.value;
export const selectHistoryFilesStatus = (state) => state.slice.historyFiles.status;
