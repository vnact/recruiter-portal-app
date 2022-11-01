<<<<<<< HEAD
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiInstance } from "../app/axiosClient";
import { RootState } from "../app/store";
import { ICareer } from "../constants/interface";

export const GetAllCareerAction = createAsyncThunk('career/getAll', async () =>
{
  const { data } = await apiInstance.get('/career')
  console.log("🚀 ~ file: careerSlice.ts ~ line 9 ~ data", data)
  return data
})

interface ICareerState
{
  loading: 'idle' | 'loading' | 'success' | 'error'
  careers?: ICareer[]
}

const InitialState: ICareerState = {
  loading: 'idle',
}

const careerSlice = createSlice({
  name: 'career',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) =>
  {
    builder
      .addCase(GetAllCareerAction.pending, (state) =>
      {
        state.loading = 'loading'
      })
      .addCase(GetAllCareerAction.fulfilled, (state, action) =>
      {
        state.loading = 'success'
        state.careers = action.payload
      })
      .addCase(GetAllCareerAction.rejected, (state, action) =>
      {
        state.loading = 'error'
      })
  }
})

export default careerSlice.reducer

export const selectCareers = (state: RootState) => state.career.careers
=======
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
>>>>>>> 663515d5f6d129d0173ebe5e6a9792033079f8cf
