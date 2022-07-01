import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface IUser {

    id: number
    name: string
    username: string
    email: string
}

interface userState {
  value: IUser[]
  loading:boolean
  error:boolean
}

const initialState: userState = {
  value: [],
  loading:false,
  error:false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState:initialState,
  reducers: {
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setUserError :(state, action: PayloadAction<boolean>) => {
      state.error = action.payload
    },
    setUser :(state, action: PayloadAction<IUser[]>) => {
      state.value = action.payload
    },
    createUser :(state, action: PayloadAction<IUser>) => {
      state.value.push(action.payload)
    },
    updateUser :(state, action: PayloadAction<IUser>) => {
      state.value[state.value.findIndex((user:IUser) => user.id === action.payload.id)] = action.payload
    },
    deleteUser :(state, action: PayloadAction<number>) => {
      state.value =  state.value.filter((user:IUser) => user.id !== action.payload);
    },
  },
})

export  type {IUser}

// Action creators are generated for each case reducer function
export const { setUserLoading, setUserError, setUser,deleteUser,createUser,updateUser} = userSlice.actions

export default userSlice.reducer