


import { createSlice } from '@reduxjs/toolkit';

const LoaiSanPham = createSlice({
    name: 'loaisanpham',
    initialState: {
        loaisanpham: {
            loaisanpham: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getLoaiSanPhamStart: (state) => {
            state.loaisanpham.isFetching = true;
        },
        getLoaiSanPhamSuccess: (state, action) => {
            state.loaisanpham.isFetching = false;
            state.loaisanpham.loaisanpham = action.payload;
            state.loaisanpham.error = false;
        },
        getLoaiSanPhamFailed: (state) => {
            state.loaisanpham.isFetching = false;
            state.loaisanpham.error = true;
        },
    },
});

export const {
    getLoaiSanPhamFailed,
    getLoaiSanPhamStart,
    getLoaiSanPhamSuccess,
} = LoaiSanPham.actions;

export default LoaiSanPham.reducer;
