import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";
import checkedSlice from "../functions/checked";
import otpSlice from "../functions/otp";

export const store = configureStore({
    reducer: {
        authSlice,
        checkedSlice,
        otpSlice
    }
})