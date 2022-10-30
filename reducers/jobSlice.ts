import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { IJob, IPagination } from '../constants/interface'

export const GetAllJobAction = createAsyncThunk('job/getAll', async (pagination: IPagination) => {
  const { data } = await apiInstance.get('/jobs', {
    params: {
      page: pagination.page || 1,
      size: pagination.size || 20,
      sort: ['maxSalary:asc'],
    },
  })
  return data
})

export const GetJobByIdAction = createAsyncThunk('job/getById', async (id: number) => {
  const { data } = await apiInstance.get(`/jobs/${id}`)
  return data
})

export const ApplyJobAction = createAsyncThunk('job/applyJob', async (id: number) => {
  const { data } = await apiInstance.post(`/apply`, { jobID: id })
  return data
})

export const ChangeFavoriteAction = createAsyncThunk('user/changeFavorite', async (id: number) => {
  const { data } = await apiInstance.post(`favorite-job`, {
    jobId: id,
  })
  return data
})

interface IJobState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  jobs: IJob[]
  job?: IJob
  isApplyJob?: boolean
}

const InitialState: IJobState = {
  loading: 'idle',
  jobs: [],
}

const jobSlice = createSlice({
  name: 'job',
  initialState: InitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllJobAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetAllJobAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.jobs = action.payload
      })
      .addCase(GetAllJobAction.rejected, (state, action) => {
        state.loading = 'error'
      })
    builder
      .addCase(GetJobByIdAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(GetJobByIdAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.job = action.payload
      })
      .addCase(GetJobByIdAction.rejected, (state, action) => {
        state.loading = 'error'
      })

    builder
      .addCase(ApplyJobAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(ApplyJobAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.job = action.payload.job
      })
      .addCase(ApplyJobAction.rejected, (state, action) => {
        state.loading = 'error'
      })
    builder
      .addCase(ChangeFavoriteAction.pending, (state) => {
        state.loading = 'loading'
      })
      .addCase(ChangeFavoriteAction.fulfilled, (state, action) => {
        state.loading = 'success'
        state.job = action.payload.job
      })
      .addCase(ChangeFavoriteAction.rejected, (state, action) => {
        state.loading = 'error'
      })
  },
})

export default jobSlice.reducer

export const selectLoading = (state: RootState) => state.job.loading
export const selectJobs = (state: RootState) => state.job.jobs
export const selectJob = (state: RootState) => state.job.job
