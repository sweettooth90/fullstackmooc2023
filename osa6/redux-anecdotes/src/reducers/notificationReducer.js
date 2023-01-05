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

export const showNotification = (message) => {
  return dispatch => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification(message))
    }, 5000)
  }
}

export const {setNotification, hideNotification} = notificationSlice.actions
export default notificationSlice.reducer
