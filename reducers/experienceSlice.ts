import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IEducation, IExperience } from '../constants/interface'
import { GetSelfAction } from './userSlice'

interface IExperienceState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  experience?: IEducation
  message?: string
}

const initialState: IExperienceState = {
  loading: 'idle',
}
interface IIdExperience {
  id: number
}
export const CreateExperienceAction = createAsyncThunk(
  'experience/create',
  async (payload: Omit<IExperience, 'id'>, thunk) => {
    const { data } = await apiInstance.post('experience', payload)
    thunk.dispatch(GetSelfAction())
    return data
  },
)
export const DeleteExperienceAction = createAsyncThunk('experience/delete', async (payload: { id: number }, thunk) => {
  const { id } = payload
  await apiInstance.delete(`experience/${id}`)
  thunk.dispatch(GetSelfAction())
  return
})
export const UpdateExperienceAction = createAsyncThunk('experience/update', async (payload: IExperience, thunk) => {
  const { id, ...dataUpdate } = payload
  await apiInstance.patch(`experience/${id}`, dataUpdate)
  thunk.dispatch(GetSelfAction())
  return
})
export const GetOneExperienceAction = createAsyncThunk('experience/id', async (payload: IIdExperience) => {
  const { id } = payload
  const { data } = await apiInstance.get(`experience/${id}`)
  return data
})
export const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ;[CreateExperienceAction, UpdateExperienceAction, DeleteExperienceAction].forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          console.log('Loading edu')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(act.fulfilled, (state, payload) => {
          console.log('Success edu')
          state.loading = 'success'
          // state.message = payload.payload.message
        })
        .addCase(act.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
          console.log('error is ' + payload.error.message)
        })
    }),
      builder
        .addCase(GetOneExperienceAction.pending, (state) => {
          console.log('Loading edu')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(GetOneExperienceAction.fulfilled, (state, payload) => {
          console.log('Success edu')
          state.loading = 'success'
          state.experience = payload.payload
        })
        .addCase(GetOneExperienceAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
          console.log('error is ' + payload.error.message)
        })
  },
})
export default experienceSlice.reducer

export const selectLoading = (state: RootState) => state.experience.loading

export const selectExperience = (state: RootState) => state.experience.experience

export const selectMessage = (state: RootState) => state.experience.message
