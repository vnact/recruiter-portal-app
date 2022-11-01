import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { ISkill } from '../constants/interface'

interface ICompany {
  id: number
  name: string
}
interface ICompanyState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  companies?: ICompany[]
  message?: string
}

const initialState: ICompanyState = {
  loading: 'idle',
}

export const GetAllCompanyAction = createAsyncThunk('company', async () => {
  const { data } = await apiInstance.get('company')
  return data
})
export const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllCompanyAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllCompanyAction.fulfilled, (state, payload) => {
        state.loading = 'success'
        state.companies = payload.payload
      })
      .addCase(GetAllCompanyAction.rejected, (state, payload) => {
        state.loading = 'error'
        state.message = payload.error.message
      })
  },
})
export default companySlice.reducer

export const selectLoading = (state: RootState) => state.company.loading
export const selectCompanies = (state: RootState) => state.company.companies
export const selectMessage = (state: RootState) => state.company.message
