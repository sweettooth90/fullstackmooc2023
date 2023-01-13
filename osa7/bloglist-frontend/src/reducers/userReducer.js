import {createSlice} from '@reduxjs/toolkit'
import userService from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initUsers(state, action) {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAllUsers()
    dispatch(initUsers(users))
  }
}

export const {initUsers} = userSlice.actions
export default userSlice.reducer
