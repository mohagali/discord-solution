import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './reducer/authSlice'
import userReducer from './reducer/userSlice'

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    user:userReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch