import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false,
        },
        register: {
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = action.payload;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
        registerStart: (state) => {
            state.register.isFetching = true;
            state.register.error = false;
            state.register.success = false;
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },
        logoutStart: (state) => {
            state.login.isFetching = true;
        },
        logoutSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.currentUser = null;
            state.login.error = false;
        },
        logoutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;
        },
    },
});

export const {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logoutStart,
    logoutSuccess,
    logoutFailed,
} = authSlice.actions;

export default authSlice.reducer;
