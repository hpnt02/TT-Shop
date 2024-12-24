import { createSlice } from '@reduxjs/toolkit';

const SanPham = createSlice({
    name: 'sanpham',
    initialState: {
        sanpham: {
            sanpham: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmsp: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getSanPhamStart: (state) => {
            state.sanpham.isFetching = true;
        },
        getSanPhamSuccess: (state, action) => {
            state.sanpham.isFetching = false;
            state.sanpham.sanpham = action.payload;
            state.sanpham.error = false;
        },
        getSanPhamFailed: (state) => {
            state.sanpham.isFetching = false;
            state.sanpham.error = true;
        },
        TMSPStart: (state) => {
            state.tmsp.isFetching = true;
            state.tmsp.error = false;
            state.tmsp.success = false;
        },
        TMSPSuccess: (state, action) => {
            state.tmsp.isFetching = false;
            state.tmsp.error = false;
            state.tmsp.success = true;
        },
        TMSPFailed: (state) => {
            state.tmsp.isFetching = false;
            state.tmsp.error = true;
            state.tmsp.success = false;
        },
        deleteSanPhamStart: (state) => {
            state.sanpham.isFetching = true;
            state.sanpham.error = false;
            state.sanpham.success = false;
        },
        deleteSanPhamSuccess: (state, action) => {
            state.sanpham.isFetching = false;
            state.sanpham.error = false;
            state.sanpham.success = true;
            state.sanpham.sanpham = state.sanpham.sanpham.filter((user) => user._id !== action.payload);
        },
        deleteSanPhamFailed: (state, action) => {
            state.sanpham.isFetching = false;
            state.sanpham.error = true;
        },
        UpdateSanPhamStart: (state) => {
            state.sanpham.isFetching = true;
        },
        UpdateSanPhamSuccess: (state, action) => {
            state.sanpham.isFetching = false;
            state.sanpham.error = false;
            const updatedUserIndex = state.sanpham.sanpham.findIndex((user) => user._id === action.payload._id);
            if (updatedUserIndex !== -1) {
                state.sanpham.sanpham[updatedUserIndex] = action.payload;
            }
        },
        UpdateSanPhamFailed: (state, action) => {
            state.sanpham.isFetching = false;
            state.sanpham.error = true;
        },
    },
});

export const {
    getSanPhamFailed,
    getSanPhamStart,
    getSanPhamSuccess,
    TMSPStart,
    TMSPSuccess,
    TMSPFailed,
    deleteSanPhamStart,
    deleteSanPhamSuccess,
    deleteSanPhamFailed,
    UpdateSanPhamStart,
UpdateSanPhamSuccess,
UpdateSanPhamFailed
} = SanPham.actions;

export default SanPham.reducer;
