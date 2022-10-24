import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import educationReducer from '../reducers/educationSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    education: educationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
