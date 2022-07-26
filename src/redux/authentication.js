// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'


export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: null
  },
  reducers: {
    handleLogin: (state, action) => {
      state.user = action.payload
      localStorage.setItem('userData', JSON.stringify(action.payload))
    },
    handleLogout: state => {
      state.user = {}
      // ** Remove user, accessToken & refreshToken from localStorage
      localStorage.removeItem('userData')
    }
  }
})

export const { handleLogin, handleLogout } = authSlice.actions

export default authSlice.reducer
