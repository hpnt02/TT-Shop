import { createSlice } from '@reduxjs/toolkit';

const Pay = createSlice({
    name: 'trangthai',
    initialState: {
        trangthai: {
            trangthai: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmpay: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getTrangThaiStart: (state) => {
            state.trangthai.isFetching = true;
        },
        getTrangThaiSuccess: (state, action) => {
            state.trangthai.isFetching = false;
            state.trangthai.trangthai = action.payload;
            state.trangthai.error = false;
        },
        getTrangThaiFailed: (state) => {
            state.trangthai.isFetching = false;
            state.trangthai.error = true;
        },
        TMPAYStart: (state) => {
            state.tmpay.isFetching = true;
            state.tmpay.error = false;
            state.tmpay.success = false;
        },
        TMPAYSuccess: (state, action) => {
            state.tmpay.isFetching = false;
            state.tmpay.error = false;
            state.tmpay.success = true;
        },
        TMPAYFailed: (state) => {
            state.tmpay.isFetching = false;
            state.tmpay.error = true;
            state.tmpay.success = false;
        },
    },
});

export const {
    getTrangThaiFailed,
    getTrangThaiStart,
    getTrangThaiSuccess,
    TMPAYStart,
    TMPAYSuccess,
    TMPAYFailed,
} = Pay.actions;

export default Pay.reducer;
