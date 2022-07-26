import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as qs from 'qs'
// ** Axios Imports
import axios from 'axios'

const userData = JSON.parse(localStorage.getItem('userData'))
const host = process.env.REACT_APP_HOST

export const getAllData = createAsyncThunk('notification/getAllData', async () => {
    const options = {
        sort: [`id:desc`]
    }
    const query = qs.stringify(options,
        {
            encodeValuesOnly: true
        }
    )
    console.log(query)

    const response = await axios.get(`${host}/api/notifications?${query}`, {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    })
    return response.data.data
})

export const updateStatus = createAsyncThunk('notification/updateStatus', async (id, { dispatch, getState }) => {
    await axios.put(`${host}/api/notifications/${id}`, { data: { status: 'read' } }, {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    })
    await dispatch(getAllData())
})

export const deleteNotification = createAsyncThunk('notification/deleteNotification', async (id, { dispatch, getState }) => {
    await axios.delete(`${host}/api/notifications/${id}`, {
        headers: {
            Authorization: `Bearer ${userData.token}`
        }
    })
    await dispatch(getAllData())
})

export const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        data: [],
        unreadCount: 0
    },
    reducers: {
    },
    extraReducers: builder => {
        builder
            .addCase(getAllData.fulfilled, (state, action) => {
                let unreadCount = 0
                state.data = action.payload
                state.data.map(item => {
                    if (item.attributes.status === 'unread') {
                        unreadCount++
                    }
                })
                state.unreadCount = unreadCount
            })
    }
})

export default notificationsSlice.reducer