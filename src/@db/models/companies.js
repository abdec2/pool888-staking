import { paginateArray } from "../../utility/Utils"

export const cRData = {
    companies: [
        {
            id: 1,
            location: 'Seef', 
            cr: '7070611-1',
            expiry: "2023-02-06T00:00:00.000Z",
            employeesNo: 5, 
            timings: '9am to 5pm',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            status: 'active'
        },
        {
            id: 2,
            location: 'Tubli', 
            cr: '7070611-2',
            expiry: "2023-02-06T00:00:00.000Z",
            employeesNo: 5, 
            timings: '9am to 5pm',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            status: 'active'
        },
        {
            id: 3,
            location: 'Riffa', 
            cr: '7070611-3',
            expiry: "2023-02-06T00:00:00.000Z",
            employeesNo: 5, 
            timings: '9am to 5pm',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            status: 'active'
        },
        {
            id: 4,
            location: 'Juffair', 
            cr: '7070611-4',
            expiry: "2023-02-06T00:00:00.000Z",
            employeesNo: 5, 
            timings: '9am to 5pm',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            status: 'active'
        },
        {
            id: 5,
            location: 'Muharraq', 
            cr: '7070611-5',
            expiry: "2023-02-06T00:00:00.000Z",
            employeesNo: 5, 
            timings: '9am to 5pm',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            status: 'active'
        }
        
    ]
}

export const crGetData = config => {
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = '',
      status = null,
      sortColumn = 'name'
    } = config
  
    const queryLowered = q.toLowerCase()
  
    const dataAsc = cRData.companies.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    
    const filteredData = dataToFilter.filter(
      employee => (employee.location.toLowerCase().includes(queryLowered) || employee.cr.toLowerCase().includes(queryLowered))
    )
      
    return {
        total: filteredData.length,
        companies: paginateArray(filteredData, perPage, page)
      }
      
    
  }

export const getCr = (param) => {
    return cRData.companies.find(item => item.id === parseInt(param.id)) || null
}

export const deleteCr = (params) => {
    const userIndex = cRData.companies.findIndex(t => t.id === parseInt(params.id))
    cRData.companies.splice(userIndex, 1)
}

export const addCr = (params) => {
    const newCr = JSON.parse(params)
    const highestValue = cRData.companies.reduce((a, b) => (a.id > b.id ? a : b)).id
    newCr.id = highestValue + 1

    cRData.companies.push(newCr)

    return newCr
}

export const updateCr = (params) => {
    const updatedCr = JSON.parse(params)
    const crIndex = cRData.companies.findIndex(t => t.id === parseInt(updatedCr.id))
    cRData.companies.splice(crIndex, 1, updatedCr)

    return updateCr
}