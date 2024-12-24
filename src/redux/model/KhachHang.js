



import { createSlice } from '@reduxjs/toolkit';

const KhachHang = createSlice({
    name: 'khachhang',
    initialState: {
        khachhang: {
            khachhang: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getKhachHangStart: (state) => {
            state.khachhang.isFetching = true;
        },
        getKhachHangSuccess: (state, action) => {
            state.khachhang.isFetching = false;
            state.khachhang.khachhang = action.payload;
            state.khachhang.error = false;
        },
        getKhachHangFailed: (state) => {
            state.khachhang.isFetching = false;
            state.khachhang.error = true;
        },
    },
});

export const {
    getKhachHangFailed,
    getKhachHangStart,
    getKhachHangSuccess,
} = KhachHang.actions;

export default KhachHang.reducer;
