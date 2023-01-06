import {createSlice} from "@reduxjs/toolkit"

const initialState = {
  message: '',
  id: undefined
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return {
        message: action.payload,
        id: state.id
      }
    },
    hideNotification() {
      return initialState
    }
  }
})

export const showNotification = (message, duration) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification(message))
    }, duration * 1000)
  }
}

export const {setNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer
