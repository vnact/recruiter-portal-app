import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/authSlice'
import educationReducer from '../reducers/educationSlice'
import userReducer from '../reducers/userSlice'
import industryReducer from '../reducers/industrySlice'
import skillReducer from '../reducers/skillSlice'
import userSkillReducer from '../reducers/userSkillSlice'
import companyReducer from '../reducers/companySlice'
import careerReducer from '../reducers/careerSlice'
import jobReducer from '../reducers/jobSlice'
<<<<<<< Updated upstream
import experienceReducer from '../reducers/experienceSlice'
=======
import careerReducer from '../reducers/careerSlice'
>>>>>>> Stashed changes
export const store = configureStore({
  reducer: {
    auth: authReducer,
    education: educationReducer,
    user: userReducer,
    industry: industryReducer,
    skill: skillReducer,
    userSkill: userSkillReducer,
    company: companyReducer,
    career: careerReducer,
    job: jobReducer,
<<<<<<< Updated upstream
    experience: experienceReducer,
=======
    career: careerReducer,
>>>>>>> Stashed changes
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
