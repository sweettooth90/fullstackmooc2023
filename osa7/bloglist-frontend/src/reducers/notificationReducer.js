import {createSlice} from '@reduxjs/toolkit'

let timeoutID
const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification(state, action) {
      return action.payload
    }
  }
})

export const handleNotification = ({text, type}) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(setNotification({text, type}))
    timeoutID = setTimeout(() => {
      dispatch(setNotification(null))
    }, 4000)
  }
}

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer
