import { createSlice } from '@reduxjs/toolkit';

const NhanVien = createSlice({
    name: 'dsnv',
    initialState: {
        dsnv: {
            dsnv: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmnv: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getDSNVStart: (state) => {
            state.dsnv.isFetching = true;
        },
        getDSNVSuccess: (state, action) => {
            state.dsnv.isFetching = false;
            state.dsnv.dsnv = action.payload;
            state.dsnv.error = false;
        },
        getDSNVFailed: (state) => {
            state.dsnv.isFetching = false;
            state.dsnv.error = true;
        },
        TMNVStart: (state) => {
            state.tmnv.isFetching = true;
            state.tmnv.error = false;
            state.tmnv.success = false;
        },
        TMNVSuccess: (state, action) => {
            state.tmnv.isFetching = false;
            state.tmnv.error = false;
            state.tmnv.success = true;
        },
        TMNVFailed: (state) => {
            state.tmnv.isFetching = false;
            state.tmnv.error = true;
            state.tmnv.success = false;
        },
        UpdateDSNVStart: (state) => {
            state.dsnv.isFetching = true;
        },
        UpdateDSNVSuccess: (state, action) => {
            state.dsnv.isFetching = false;
            state.dsnv.error = false;
            const updatedUserIndex = state.dsnv.dsnv.findIndex((user) => user._id === action.payload._id);
            if (updatedUserIndex !== -1) {
                state.dsnv.dsnv[updatedUserIndex] = action.payload;
            }
        },
        UpdateDSNVFailed: (state, action) => {
            state.dsnv.isFetching = false;
            state.dsnv.error = true;
        },
        deleteDSNVStart: (state) => {
            state.dsnv.isFetching = true;
            state.dsnv.error = false;
            state.dsnv.success = false;
        },
        deleteDSNVSuccess: (state, action) => {
            state.dsnv.isFetching = false;
            state.dsnv.error = false;
            state.dsnv.success = true;
            state.dsnv.dsnv = state.dsnv.dsnv.filter((user) => user._id !== action.payload);
        },
        deleteDSNVFailed: (state, action) => {
            state.dsnv.isFetching = false;
            state.dsnv.error = true;
        },
    },
});

export const {
    getDSNVFailed,
    getDSNVStart,
    getDSNVSuccess,
    TMNVStart,
    TMNVSuccess,
    TMNVFailed,
    UpdateDSNVStart,
    UpdateDSNVSuccess,
    UpdateDSNVFailed,
    deleteDSNVStart,
    deleteDSNVSuccess,
    deleteDSNVFailed,
} = NhanVien.actions;

export default NhanVien.reducer;
