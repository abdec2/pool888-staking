// ** Reducers Imports
import navbar from './navbar'
import layout from './layout'
import auth from './authentication'
import employees from './../views/pages/employees/store'
import companies from './../views/pages/company/store'
import notifications from './../components/navbar/store'
import ConnectWallet from './connectWallet'
import PoolData from './../views/pages/pool/store'

const rootReducer = {
  ConnectWallet,
  auth,
  navbar,
  layout,
  employees,
  companies,
  notifications, 
  PoolData
}

export default rootReducer
