import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  email: '',
  password: ''
}

export const otpSlice = createSlice({
  name: 'otp',
  initialState,
  reducers: {
    otp: (state, action) => {
      console.log(action);
      state.email = action.payload.email;
      state.password = action.payload.password;
    }
  }
})

export const { otp } = otpSlice.actions
export default otpSlice.reducer
