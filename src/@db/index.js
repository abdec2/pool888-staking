import { createServer } from "miragejs"
import { data, getData, getEmployee, delEmployee, addEmployee, updateStatus, updateEmployee } from "./models/employees"
import { cRData, crGetData, getCr, deleteCr, addCr, updateCr } from "./models/companies"

export default function () {

  createServer({
    routes() {
        this.get("/api/employees", () => data.employees)
        this.get("/api/employees/list/data", (schema, request) => getData(request.queryParams))
        this.get("/api/employees/employee", (_, request) => getEmployee(request.queryParams))
        this.del('/api/employees/delete', (_, req) => delEmployee(req.queryParams))
        this.post('/api/employees/add-employee', (_, req) => addEmployee(req.requestBody))
        this.put('/api/employees/update-status', (_, req) => updateStatus(req.requestBody))
        this.put('/api/employees/update', (_, req) => updateEmployee(req.requestBody))
        // company routes
        this.get("/api/companies", () => cRData.companies)
        this.get("/api/companies/list/data", (schema, request) => crGetData(request.queryParams))
        this.get("/api/companies/cr", (_, request) => getCr(request.queryParams))
        this.del('/api/companies/delete', (_, req) => deleteCr(req.queryParams))
        this.post('/api/companies/add-cr', (_, req) => addCr(req.requestBody))
        this.put('/api/companies/update-cr', (_, req) => updateCr(req.requestBody))
        
        
    }
  })
}
