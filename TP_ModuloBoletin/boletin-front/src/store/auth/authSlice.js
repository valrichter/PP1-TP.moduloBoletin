import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // authenticated, not-authenticated, checking
        user:{}, //email - password - tipo - nombre
        errorMessage: undefined
    },
    reducers: {
        onLogin: (state, {payload} ) => {
            state.status = 'authenticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: (state, {payload}) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        }
    }
});
export const { onLogin, onLogout } = authSlice.actions;