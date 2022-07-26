import { paginateArray } from "../../utility/Utils"

export const data = {
    employees: [
        {
            id: 1,
            name: 'Azim Baig', 
            dob: '1987-12-02T00:00:00.000Z', 
            cpr: '871241854',
            nationality: 'Pakistan', 
            passport: 'AY3924154',
            phone: '36387778',
            address: 'flat 1 building 2201 road 1144, block 711 tubli',
            expatriate: true, 
            contractSigned: true, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli', 
            status: 'active'
        },
        {
            id: 2,
            name: 'Abdulla alsaeed', 
            dob: '1996-02-06T00:00:00.000Z', 
            cpr: '960641854',
            nationality: 'Bahrain', 
            passport: 'xxxxxxxxx',
            phone: '00000000',
            address: 'Address ',
            expatriate: false, 
            contractSigned: false, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli',
            status: 'active'
        },
        {
            id: 3,
            name: 'Syed Fadhel', 
            dob: '1997-03-17T00:00:00.000Z', 
            cpr: '970441854',
            nationality: 'Bahrain', 
            passport: 'xxxxxxxxxxx',
            phone: '111111111',
            address: 'Address',
            expatriate: false, 
            contractSigned: false, 
            contract_img: '',
            cpr_img_front:'', 
            cpr_img_back: '',
            branch: 'tubli',
            status: 'active'
        }
    ]
}

export const getData = config => {
    const {
      q = '',
      page = 1,
      perPage = 10,
      sort = '',
      status = null,
      sortColumn = 'name', 
      nationality = "",
      branch = ""

    } = config
  
    const queryLowered = q.toLowerCase()
  
    const dataAsc = data.employees.sort((a, b) => (a[sortColumn] < b[sortColumn] ? -1 : 1))
  
    const dataToFilter = sort === 'asc' ? dataAsc : dataAsc.reverse()
    console.log('type', typeof nationality)
    const filteredData = dataToFilter.filter(
      employee => (employee.name.toLowerCase().includes(queryLowered) || employee.cpr.toLowerCase().includes(queryLowered)) && 
      employee.expatriate === ((nationality === "true") ? true : (nationality === "false") ? false : employee.expatriate) &&
      employee.branch === (branch || employee.branch) &&
      employee.status === (status || employee.status)
    )
      
    return {
        total: filteredData.length,
        employees: paginateArray(filteredData, perPage, page)
      }
      
    
  }

export const getEmployee = (param) => {
    return data.employees.find(item => item.id === parseInt(param.id)) || null
}

export const delEmployee = (params) => {
    const userIndex = data.employees.findIndex(t => t.id === parseInt(params.id))
    data.employees.splice(userIndex, 1)
}

export const addEmployee = (params) => {
    const newEmployee = JSON.parse(params)
    const highestValue = data.employees.reduce((a, b) => (a.id > b.id ? a : b)).id
    newEmployee.id = highestValue + 1

    data.employees.push(newEmployee)

    return newEmployee
}

export const updateStatus = (params) => {
    params = JSON.parse(params)
    const updateEmployee = data.employees.find(item => item.id === parseInt(params.id))
    const employeeIndex = data.employees.findIndex(t => t.id === parseInt(params.id))

    updateEmployee.status = params.status

    data.employees.splice(employeeIndex, 1, updateEmployee)

    return updateEmployee
}

export const updateEmployee = (params) => {
    const updateEmployee = JSON.parse(params)
    const employeeIndex = data.employees.findIndex(t => t.id === parseInt(updateEmployee.id))

    data.employees.splice(employeeIndex, 1, updateEmployee)
    console.log(data)
    return updateEmployee
}