



import { createSlice } from '@reduxjs/toolkit';

const Account = createSlice({
    name: 'account',
    initialState: {
        account: {
            account: null,
            isFetching: false,
            error: false,
            success: false,
        },
    },
    reducers: {
        getAccountStart: (state) => {
            state.account.isFetching = true;
        },
        getAccountSuccess: (state, action) => {
            state.account.isFetching = false;
            state.account.account = action.payload;
            state.account.error = false;
        },
        getAccountFailed: (state) => {
            state.account.isFetching = false;
            state.account.error = true;
        },
    },
});

export const {
    getAccountFailed,
    getAccountStart,
    getAccountSuccess,
} = Account.actions;

export default Account.reducer;
