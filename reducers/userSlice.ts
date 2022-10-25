import { createSlice } from '@reduxjs/toolkit'

interface IUserState {
  loading: 'idle' | 'loading' | 'success' | 'error'
  message?: string
  user: string
}

// const userSlice=createSlice({
//     name:'user',
//     reducers:{},
//     initialState

// })
