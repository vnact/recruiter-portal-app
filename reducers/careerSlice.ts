import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IIndustry, ISkill } from '../constants/interface'

interface ICareer {
  id: number
  name: string
  parent?: ICareer
  industry: IIndustry
}
interface ICareerState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  careers?: ICareer[]
  message?: string
}

const initialState: ICareerState = {
  loading: 'idle',
}

export const GetAllCareerAction = createAsyncThunk('career', async () => {
  const { data } = await apiInstance.get('career')
  return data
})
export const careerSlice = createSlice({
  name: 'career',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllCareerAction.pending, (state) => {
        console.log('laoding career')
        state.loading = 'loading'
      })
      .addCase(GetAllCareerAction.fulfilled, (state, payload) => {
        console.log('success career')
        state.loading = 'success'
        state.careers = payload.payload
        console.log(payload.payload)
      })
      .addCase(GetAllCareerAction.rejected, (state, payload) => {
        console.log('error career')
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export default careerSlice.reducer

export const selectLoading = (state: RootState) => state.career.loading
export const selectCareers = (state: RootState) => state.career.careers
export const selectMessage = (state: RootState) => state.career.message