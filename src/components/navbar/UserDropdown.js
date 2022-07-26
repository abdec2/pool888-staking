// ** React Imports
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'

// ** Third Party Components
import { User, Mail, CheckSquare, MessageSquare, Settings, CreditCard, HelpCircle, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-11.jpg'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { handleLogout } from '../../redux/authentication'

const UserDropdown = () => {
  // ** State
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  const history = useHistory()
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  const logout = (e) => {
    e.preventDefault()
    dispatch(handleLogout())
    history.push('/')
    
  }


  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{(userData && userData['name']) || 'Admin'}</span>
          <span className='user-status'>{(userData && userData.role) || 'Admin'}</span>
        </div>
        <Avatar color={color || 'primary'} content={(userData && userData.username.toUpperCase()) || 'Admin'} initials status='online' />
      </DropdownToggle>
      <DropdownMenu end>
        
        <DropdownItem onClick={logout}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
