import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IIndustry, ISkill } from '../constants/interface'

interface ICareer {
  id: number
  name: string
  parent: ICareer
  industry: IIndustry
}
interface ICompanyState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  careers?: ICareer[]
  message?: string
}

const initialState: ICompanyState = {
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
        state.loading = 'loading'
      })
      .addCase(GetAllCareerAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.careers = payload.payload
      })
      .addCase(GetAllCareerAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export default careerSlice.reducer

export const selectLoading = (state: RootState) => state.career.loading
export const selectCareers = (state: RootState) => state.career.careers
export const selectMessage = (state: RootState) => state.career.message
