import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface tokenState {
  value: string
  loading:boolean
  error:boolean
}

const initialState: tokenState = {
  value: '',
  loading:false,
  error:false,
}

export const tokenSlice = createSlice({
  name: 'token',
  initialState:initialState,
  reducers: {
    setTokenLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setTokenError :(state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
    setToken :(state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setTokenLoading, setTokenError, setToken } = tokenSlice.actions

export default tokenSlice.reducer