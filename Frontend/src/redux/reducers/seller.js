import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSeller: false,
};

export const sellerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase('LoadSellerRequest', (state) => {
            state.isloading = true;
        })
        .addCase('LoadSellerSuccess', (state, action) => {
            state.isAuthenticated = true;
            state.isloading = false;
            state.seller = action.payload;
        })
        .addCase('LoadSellerFail', (state, action) => {
            state.isloading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        })
        .addCase('clearErrors', (state) => {
            state.error = null;
        });
});
