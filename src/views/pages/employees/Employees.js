// ** User List Component
import Table from './components/employeeList/Table'

// ** Styles
import '@styles/react/apps/app-users.scss'

const Employees = () => {
  return (
    <div className='app-user-list'>
      <div className='mt-4 mb-2'><h1>Employees List</h1></div>
      <Table />
    </div>
  )
}

export default Employees
