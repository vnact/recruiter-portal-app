import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IEducation } from '../constants/interface'

interface IEducationState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  education?: IEducation
  message?: string
}

const initialState: IEducationState = {
  loading: 'idle',
}
export const CreateEducationAction = createAsyncThunk('education/create', async (payload: Omit<IEducation, 'id'>) => {
  const { data } = await apiInstance.post('education', payload)
  return data
})
export const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CreateEducationAction.pending, (state) => {
        console.log('Loading edu')
        state.loading = 'loading'
        state.message = undefined
      })
      .addCase(CreateEducationAction.fulfilled, (state, payload) => {
        console.log('Success edu')
        state.loading = 'success'
        // state.message = payload.payload.message
      })
      .addCase(CreateEducationAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
        console.log('error is ' + payload.error.message)
      })
  },
})
export default educationSlice.reducer

export const selectingLoading = (state: RootState) => state.education.loading

export const selectingEducation = (state: RootState) => state.education.education

export const selectingMessage = (state: RootState) => state.education.message
