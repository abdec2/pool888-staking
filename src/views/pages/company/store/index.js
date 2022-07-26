// store for company section
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as qs from 'qs'

// ** Axios Imports
import axios from 'axios'

const userData = JSON.parse(localStorage.getItem('userData'))
const host = process.env.REACT_APP_HOST

export const getAllData = createAsyncThunk('companies/getAllData', async () => {
    const response = await axios.get(`${host}/api/crs`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    return response.data.data
  })
  
  export const getData = createAsyncThunk('companies/getData', async params => {
    const {page, perPage, q, sort, sortColumn} = params
    const query = qs.stringify(
      {
        sort: [`${sortColumn}:${sort}`], 
        filters: {
          $or: [
            {
              location: {
                $containsi: q
              }
            }, 
            {
              cr: {
                $containsi: q
              }
            }
          ]
        },
        pagination: {
          page, 
          pageSize: perPage
        }        
      }, 
      {
        encodeValuesOnly: true
      }
    )
    const dataUri = `${host}/api/crs?${query}`
    const response = await axios.get(dataUri, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    return {
      params,
      data: response.data.data,
      totalPages: response.data.meta.pagination.pageCount
    }
  })

  export const getCR = createAsyncThunk('companies/getCr', async id => {
    const response = await axios.get(`${host}/api/crs/${id}`, { 
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    return response.data.data
  })
  
  export const addCr = createAsyncThunk('companies/addCr', async (cr, { dispatch, getState }) => {
    await axios.post(`${host}/api/crs/`, {data: cr}, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return cr
  })

  export const updateCr = createAsyncThunk('companies/updateCr', async (cr, { dispatch, getState }) => {
    await axios.put(`${host}/api/crs/${cr.id}`, {data:cr}, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return cr
  })
  
  export const deleteCr = createAsyncThunk('companies/deleteCr', async (id, { dispatch, getState }) => {
    await axios.delete(`${host}/api/crs/${id}`, {
      headers: {
        Authorization: `Bearer ${userData.token}`
      }
    })
    await dispatch(getData(getState().companies.params))
    await dispatch(getAllData())
    return id
  })
  
  export const companiesSlice = createSlice({
    name: 'companies',
    initialState: {
      data: [],
      total: 1,
      params: {},
      allData: [],
      selectedCr: null, 
      editModal: false
    },
    reducers: {
        toggleEditModal: (state) => {
            state.editModal = !state.editModal
        }
    },
    extraReducers: builder => {
      builder
        .addCase(getAllData.fulfilled, (state, action) => {
          state.allData = action.payload
        })
        .addCase(getData.fulfilled, (state, action) => {
          state.data = action.payload.data
          state.params = action.payload.params
          state.total = action.payload.totalPages
        })
        .addCase(getCR.fulfilled, (state, action) => {
          state.selectedCr = action.payload
        })
    }
  })

  export const { toggleEditModal } = companiesSlice.actions
  
  export default companiesSlice.reducer