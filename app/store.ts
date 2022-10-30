import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import educationReducer from '../reducers/educationSlice'
import userReducer from '../reducers/userSlice'
import industryReducer from '../reducers/industrySlice'
import skillReducer from '../reducers/skillSlice'
import userSkillReducer from '../reducers/userSkillSlice'
import jobReducer from '../reducers/jobSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    education: educationReducer,
    user: userReducer,
    industry: industryReducer,
    skill: skillReducer,
    userSkill: userSkillReducer,
    job: jobReducer,
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
