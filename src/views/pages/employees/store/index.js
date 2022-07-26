// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as qs from 'qs'
// ** Axios Imports
import axios from 'axios'

const userData = JSON.parse(localStorage.getItem('userData'))
const host = process.env.REACT_APP_HOST

export const getAllData = createAsyncThunk('employees/getAllData', async () => {
  const query = qs.stringify({
    populate: {
      cr: {
        fields: ['id', 'location']
      }
    }
  })
  const response = await axios.get(`${host}/api/employees?${query}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  return response.data.data
})

export const getData = createAsyncThunk('employees/getData', async params => {
  const { branch, nationality, page, perPage, q, sort, sortColumn, status } = params
  const qOptions = {
    sort: [`${sortColumn}:${sort}`],
    populate: {
      cr: {
        fields: ['id', 'location']
      }
    },
    filters: {
      $or: [
        {
          name: {
            $containsi: q
          }
        },
        {
          cpr: {
            $containsi: q
          }
        }
      ],

      status: {
        $containsi: status
      }
    },
    pagination: {
      page,
      pageSize: perPage
    }
  }
  if (nationality !== '') {
    qOptions.filters.expatriate = {
      $eq: nationality
    }
  }
  if (branch !== '') {
    qOptions.filters.cr = {
      id: {
        $eq: branch
      }
    }
  }
  const query = qs.stringify(qOptions,
    {
      encodeValuesOnly: true
    }
  )
  const dataUri = `${host}/api/employees?${query}`
  console.log(dataUri)
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

export const getEmployee = createAsyncThunk('employees/getEmployee', async id => {
  const query = qs.stringify({
    populate: {
      cr: {
        fields: ['id', 'location']
      }
    }
  })
  const response = await axios.get(`${host}/api/employees/${id}?${query}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  return response.data
})

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employee, { dispatch, getState }) => {
  console.log(employee)
  await axios.post(`${host}/api/employees`, { data: employee }, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getData(getState().employees.params))
  await dispatch(getAllData())
  return employee
})

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id, { dispatch, getState }) => {
  await axios.delete(`${host}/api/employees/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getData(getState().employees.params))
  await dispatch(getAllData())
  return id
})

export const updateEmployeeStatus = createAsyncThunk('employees/updateEmployeeStatus', async (status, { dispatch, getState }) => {
  await axios.put(`${host}/api/employees/${status.id}`, { data: { ...status } }, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getEmployee(status.id))
  await dispatch(getAllData())
  return status
})

export const updateEmployee = createAsyncThunk('employees/update', async (employee, { dispatch, getState }) => {
  console.log(employee)
  await axios.put(`${host}/api/employees/${employee.id}`, { data: { ...employee } }, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getEmployee(employee.id))
  return employee
})

// ===============================================================================================================================

export const getAllVisas = createAsyncThunk('employees/visas', async () => {
  const query = qs.stringify({
    populate: {
      employee: {
        fields: ['id', 'name', 'cpr', 'passport']
      }
    }
  })
  const response = await axios.get(`${host}/api/visas?${query}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  return response.data.data
})

export const getVisaData = createAsyncThunk('employees/visaData', async params => {
  const { page, perPage, q, sort, sortColumn } = params
  const qOptions = {
    sort: [`${sortColumn}:${sort}`],
    populate: {
      employee: {
        fields: ['id', 'name', 'cpr', 'passport']
      }
    },
    filters: {
      $or: [
        {
          employee: {
            name: {
              $containsi: q
            }
          }
        },
        {
          employee: {
            cpr: {
              $containsi: q
            }
          }
        }
      ]
    },
    pagination: {
      page,
      pageSize: perPage
    }
  }
  const query = qs.stringify(qOptions,
    {
      encodeValuesOnly: true
    }
  )
  const dataUri = `${host}/api/visas?${query}`
  console.log(dataUri)
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

export const deleteVisa = createAsyncThunk('employees/deleteVisa', async (id, { dispatch, getState }) => {
  await axios.delete(`${host}/api/visas/${id}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getVisaData(getState().employees.visaParams))
  await dispatch(getAllVisas())
  return id
})

export const getVisa = createAsyncThunk('employees/getVisa', async id => {
  const query = qs.stringify({
    populate: {
      employee: {
        fields: ['id', 'name', 'cpr', 'passport']
      }
    }
  })
  const response = await axios.get(`${host}/api/visas/${id}?${query}`, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  return response.data
})

export const addVisa = createAsyncThunk('employees/addVisa', async (visa, { dispatch, getState }) => {
  console.log(visa)
  await axios.post(`${host}/api/visas`, { data: visa }, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getVisaData(getState().employees.visaParams))
  await dispatch(getAllVisas())
  return visa
})

export const updateVisa = createAsyncThunk('employees/updateVisa', async (visa, { dispatch, getState }) => {
  console.log(visa)
  await axios.put(`${host}/api/visas/${visa.id}`, { data: { ...visa } }, {
    headers: {
      Authorization: `Bearer ${userData.token}`
    }
  })
  await dispatch(getVisa(visa.id))
  await dispatch(getVisaData(getState().employees.visaParams))
  await dispatch(getAllVisas())
  return visa
})

export const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    data: [],
    total: 1,
    visaTotal: 1,
    params: {},
    visaParams: {},
    allData: [],
    allVisas: [],
    visaData: [],
    selectedVisa: null,
    selectedEmployee: null,
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
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.selectedEmployee = action.payload
      })
      .addCase(getAllVisas.fulfilled, (state, action) => {
        state.allVisas = action.payload
      })
      .addCase(getVisaData.fulfilled, (state, action) => {
        state.visaData = action.payload.data
        state.visaParams = action.payload.params
        state.visaTotal = action.payload.totalPages
      })
      .addCase(getVisa.fulfilled, (state, action) => {
        state.selectedVisa = action.payload
      })
  }
})

export const { toggleEditModal } = employeeSlice.actions
export default employeeSlice.reducer
