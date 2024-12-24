

import { createSlice } from '@reduxjs/toolkit';

const NhaCungCap = createSlice({
    name: 'nhacungcap',
    initialState: {
        nhacungcap: {
            nhacungcap: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getNhaCungCapStart: (state) => {
            state.nhacungcap.isFetching = true;
        },
        getNhaCungCapSuccess: (state, action) => {
            state.nhacungcap.isFetching = false;
            state.nhacungcap.nhacungcap = action.payload;
            state.nhacungcap.error = false;
        },
        getNhaCungCapFailed: (state) => {
            state.nhacungcap.isFetching = false;
            state.nhacungcap.error = true;
        },
    },
});

export const {
    getNhaCungCapFailed,
    getNhaCungCapStart,
    getNhaCungCapSuccess,
} = NhaCungCap.actions;

export default NhaCungCap.reducer;
