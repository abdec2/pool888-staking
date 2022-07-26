// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import employees from './../views/pages/employees/store'
import companies from './../views/pages/company/store'
import notifications from './../components/navbar/store'

const rootReducer = {
  auth,
  navbar,
  layout,
  employees,
  companies,
  notifications
}

export default rootReducer
