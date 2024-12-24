import { createSlice } from '@reduxjs/toolkit';

const HoaDon = createSlice({
    name: 'hoadon',
    initialState: {
        hoadon: {
            hoadon: null,
            isFetching: false,
            error: false,
            success: false,
        },
        tmhd: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getHoaDonStart: (state) => {
            state.hoadon.isFetching = true;
        },
        getHoaDonSuccess: (state, action) => {
            state.hoadon.isFetching = false;
            state.hoadon.hoadon = action.payload;
            state.hoadon.error = false;
        },
        getHoaDonFailed: (state) => {
            state.hoadon.isFetching = false;
            state.hoadon.error = true;
        },
        TMHDStart: (state) => {
            state.tmhd.isFetching = true;
            state.tmhd.error = false;
            state.tmhd.success = false;
        },
        TMHDSuccess: (state, action) => {
            state.tmhd.isFetching = false;
            state.tmhd.error = false;
            state.tmhd.success = true;
        },
        TMHDFailed: (state) => {
            state.tmhd.isFetching = false;
            state.tmhd.error = true;
            state.tmhd.success = false;
        },
        UpdateHoaDonStart: (state) => {
            state.hoadon.isFetching = true;
        },
        UpdateHoaDonSuccess: (state, action) => {
            state.hoadon.isFetching = false;
            state.hoadon.error = false;
            const updatedUserIndex = state.hoadon.hoadon.findIndex((user) => user._id === action.payload._id);
            if (updatedUserIndex !== -1) {
                state.hoadon.hoadon[updatedUserIndex] = action.payload;
            }
        },
        UpdateHoaDonFailed: (state, action) => {
            state.hoadon.isFetching = false;
            state.hoadon.error = true;
        },
    },
});

export const {
    getHoaDonFailed,
    getHoaDonStart,
    getHoaDonSuccess,
    UpdateHoaDonStart,
    UpdateHoaDonSuccess,
    UpdateHoaDonFailed,
    TMHDStart,
    TMHDSuccess,
    TMHDFailed,
} = HoaDon.actions;

export default HoaDon.reducer;
