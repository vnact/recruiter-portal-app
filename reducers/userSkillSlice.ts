import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiInstance } from '../app/axiosClient'
import { RootState } from '../app/store'
import { ISkill } from '../constants/interface'
import { GetSelfAction } from './userSlice'

interface ISkillState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  userSkill?: ISkill
  message?: string
}
interface ISkills {
  skills_id: number[]
}
const initialState: ISkillState = {
  loading: 'idle',
}
interface IIdSkill {
  id: number
}
interface IUserSkill extends ISkills {
  userId: number
}
export const CreateUserSkillAction = createAsyncThunk(
  'user-skill/create',
  async (payload: Omit<ISkills, 'id'>, thunk) => {
    const { data } = await apiInstance.post('user-skill', payload)
    thunk.dispatch(GetSelfAction())
    return data
  },
)
export const DeleteUserSkillAction = createAsyncThunk('user-skill/delete', async (payload: { id: number }, thunk) => {
  const { id } = payload
  await apiInstance.delete(`UserSkill/${id}`)
  thunk.dispatch(GetSelfAction())
  return
})
export const UpdateUserSkillAction = createAsyncThunk('user-skill/update', async (payload: IUserSkill, thunk) => {
  const { userId, ...dataUpdate } = payload
  await apiInstance.patch(`user-skill/${userId}`, dataUpdate)
  thunk.dispatch(GetSelfAction())
  return
})
export const GetOneUserSkillAction = createAsyncThunk('user-skill/id', async (payload: IIdSkill) => {
  const { id } = payload
  const { data } = await apiInstance.get(`user-skill/${id}`)
  return data
})
export const UserSkillSlice = createSlice({
  name: 'userSkill',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ;[CreateUserSkillAction, UpdateUserSkillAction, DeleteUserSkillAction].forEach((act) => {
      builder
        .addCase(act.pending, (state) => {
          console.log('Loading user-skill')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(act.fulfilled, (state, payload) => {
          console.log('Success user-skill')
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
        .addCase(GetOneUserSkillAction.pending, (state) => {
          console.log('Loading user-skill')
          state.loading = 'loading'
          state.message = undefined
        })
        .addCase(GetOneUserSkillAction.fulfilled, (state, payload) => {
          console.log('Success user-skill')
          state.loading = 'success'
          state.userSkill = payload.payload
        })
        .addCase(GetOneUserSkillAction.rejected, (state, payload) => {
          state.loading = 'error'
          state.message = payload.error.message
          console.log('error is ' + payload.error.message)
        })
  },
})
export default UserSkillSlice.reducer

export const selectLoading = (state: RootState) => state.userSkill.loading

export const selectUserSkill = (state: RootState) => state.userSkill.userSkill

export const selectMessage = (state: RootState) => state.userSkill.message
