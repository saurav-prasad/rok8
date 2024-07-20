import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = {
                ...action.payload
            }
            state.user = { ...user }
        },
        logout: (state, action) => {
            localStorage.removeItem('user')
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer