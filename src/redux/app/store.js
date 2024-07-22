import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";
import checkedSlice from "../functions/checked";

export const store = configureStore({
    reducer: {
        authSlice,
        checkedSlice
    }
})