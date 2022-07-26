// ** React Imports
import { useEffect } from 'react'
import { useParams, Link, useHistory } from 'react-router-dom'

// ** Store & Actions
import { getEmployee } from './store'
import { useSelector, useDispatch } from 'react-redux'

// ** Reactstrap Imports
import { Row, Col, Alert, Button } from 'reactstrap'

// ** User View Components
import UserInfoCard from './components/employeeView/UserInfoCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const EmployeeView = () => {
  // ** Store Vars
  const store = useSelector(state => state.employees)
  const dispatch = useDispatch()
  const history = useHistory()
  console.log(store)
  // ** Hooks
  const { id } = useParams()

  const handleBack = () => {
    history.goBack()
  }

  // ** Get suer on mount
  useEffect(() => {
    dispatch(getEmployee(parseInt(id)))    
  }, [dispatch])

  return store.selectedEmployee !== null && store.selectedEmployee !== undefined ? (
    <div className='app-user-view'>
      <div className='mb-2'>
        <Button.Ripple color='flat-secondary' onClick={() => handleBack()}>Back</Button.Ripple>
      </div>
      <Row>
        <Col xl='4' lg='5' xs={{ order: 1 }} md={{ order: 0, size: 5 }}>
          <UserInfoCard selectedUser={store.selectedEmployee.data} />
        </Col>
        
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>Employee not found</h4>
      <div className='alert-body'>
        Employee with id: {id} doesn't exist. Check list of all Employees: <Link to='/employees/view'>Employee List</Link>
      </div>
    </Alert>
  )
}
export default EmployeeView
