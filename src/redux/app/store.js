import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../functions/auth";

export const store = configureStore({
    reducer: {
        authSlice
    }
})