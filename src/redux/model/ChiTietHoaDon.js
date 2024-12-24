import { createSlice } from '@reduxjs/toolkit';

const ChiTietHoaDon = createSlice({
    name: 'chitiethoadon',
    initialState: {
        chitiethoadon: {
            chitiethoadon: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmcthd: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getChiTietHoaDonStart: (state) => {
            state.chitiethoadon.isFetching = true;
        },
        getChiTietHoaDonSuccess: (state, action) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.chitiethoadon = action.payload;
            state.chitiethoadon.error = false;
        },
        getChiTietHoaDonFailed: (state) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.error = true;
        },
        TMCTHDStart: (state) => {
            state.tmcthd.isFetching = true;
            state.tmcthd.error = false;
            state.tmcthd.success = false;
        },
        TMCTHDSuccess: (state, action) => {
            state.tmcthd.isFetching = false;
            state.tmcthd.error = false;
            state.tmcthd.success = true;
        },
        TMCTHDFailed: (state) => {
            state.tmcthd.isFetching = false;
            state.tmcthd.error = true;
            state.tmcthd.success = false;
        },
        UpdateCTHDStart: (state) => {
            state.chitiethoadon.isFetching = true;
        },
        UpdateCTHDSuccess: (state, action) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.error = false;
            const updatedUserIndex = state.chitiethoadon.chitiethoadon.findIndex(
                (user) => user._id === action.payload._id,
            );
            if (updatedUserIndex !== -1) {
                state.chitiethoadon.chitiethoadon[updatedUserIndex] = action.payload;
            }
        },
        UpdateCTHDFailed: (state, action) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.error = true;
        },
        deleteCTHDStart: (state) => {
            state.chitiethoadon.isFetching = true;
            state.chitiethoadon.error = false;
            state.chitiethoadon.success = false;
        },
        deleteCTHDSuccess: (state, action) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.error = false;
            state.chitiethoadon.success = true;
            state.chitiethoadon.chitiethoadon = state.chitiethoadon.chitiethoadon.filter(
                (user) => user._id !== action.payload,
            );
        },
        deleteCTHDFailed: (state, action) => {
            state.chitiethoadon.isFetching = false;
            state.chitiethoadon.error = true;
        },
    },
});

export const {
    getChiTietHoaDonFailed,
    getChiTietHoaDonStart,
    getChiTietHoaDonSuccess,
    TMCTHDStart,
    TMCTHDSuccess,
    TMCTHDFailed,
    UpdateCTHDStart,
    UpdateCTHDSuccess,
    UpdateCTHDFailed,
    deleteCTHDStart,
    deleteCTHDSuccess,
    deleteCTHDFailed,
} = ChiTietHoaDon.actions;

export default ChiTietHoaDon.reducer;
