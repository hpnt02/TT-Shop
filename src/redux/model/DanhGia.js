import { createSlice } from '@reduxjs/toolkit';

const DanhGia = createSlice({
    name: 'danhgia',
    initialState: {
        danhgia: {
            danhgia: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmdg: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getDanhGiaStart: (state) => {
            state.danhgia.isFetching = true;
        },
        getDanhGiaSuccess: (state, action) => {
            state.danhgia.isFetching = false;
            state.danhgia.danhgia = action.payload;
            state.danhgia.error = false;
        },
        getDanhGiaFailed: (state) => {
            state.danhgia.isFetching = false;
            state.danhgia.error = true;
        },
        TMDGStart: (state) => {
            state.tmdg.isFetching = true;
            state.tmdg.error = false;
            state.tmdg.success = false;
        },
        TMDGSuccess: (state, action) => {
            state.tmdg.isFetching = false;
            state.tmdg.error = false;
            state.tmdg.success = true;
        },
        TMDGFailed: (state) => {
            state.tmdg.isFetching = false;
            state.tmdg.error = true;
            state.tmdg.success = false;
        },
        deleteDanhGiaStart: (state) => {
            state.danhgia.isFetching = true;
            state.danhgia.error = false;
            state.danhgia.success = false;
        },
        deleteDanhGiaSuccess: (state, action) => {
            state.danhgia.isFetching = false;
            state.danhgia.error = false;
            state.danhgia.success = true;
            state.danhgia.danhgia = state.danhgia.danhgia.filter((user) => user._id !== action.payload);
        },
        deleteDanhGiaFailed: (state, action) => {
            state.danhgia.isFetching = false;
            state.danhgia.error = true;
        },
        UpdateDanhGiaStart: (state) => {
            state.danhgia.isFetching = true;
        },
        UpdateDanhGiaSuccess: (state, action) => {
            state.danhgia.isFetching = false;
            state.danhgia.error = false;
            const updatedUserIndex = state.danhgia.danhgia.findIndex((user) => user._id === action.payload._id);
            if (updatedUserIndex !== -1) {
                state.danhgia.danhgia[updatedUserIndex] = action.payload;
            }
        },
        UpdateDanhGiaFailed: (state, action) => {
            state.danhgia.isFetching = false;
            state.danhgia.error = true;
        },
    },
});

export const {
    getDanhGiaFailed,
    getDanhGiaStart,
    getDanhGiaSuccess,
    TMDGStart,
    TMDGSuccess,
    TMDGFailed,
    deleteDanhGiaStart,
    deleteDanhGiaSuccess,
    deleteDanhGiaFailed,
    UpdateDanhGiaStart,
UpdateDanhGiaSuccess,
UpdateDanhGiaFailed
} = DanhGia.actions;

export default DanhGia.reducer;
