// ** React Imports
import { Fragment, useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle, Trash2 } from 'react-feather'

// ** Reactstrap Imports
import { Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAllData, updateStatus, deleteNotification } from './store'

const NotificationDropdown = () => {
  const [unread, setUnread] = useState([])
  const dispatch = useDispatch()
  const store = useSelector(state => state.notifications)
  console.log(store)

  const HandleRead = (e, id) => {
    e.preventDefault()
    dispatch(updateStatus(id))
  }

  const handleDeleteNoti = (e, id) => {
    e.preventDefault()
    dispatch(deleteNotification(id))
  }
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {store.data.map((item, index) => {
          return (
            <div key={index} className='border-bottom d-flex align-items-center justify-content-between'>
              <a href='/' onClick={e => HandleRead(e, item.id)}>
                <div style={{borderBottom: 'none'}} className='list-item d-flex'>
                  <Fragment>
                    <div className='list-item-body flex-grow-1'>
                      <p className='media-heading'>
                        <span className={classnames({
                          'fw-bolder': item.attributes.status === 'unread',
                          'fw-normal': item.attributes.status === 'read'
                        })}>{item.attributes.title}</span>
                      </p>
                      <small className='notification-text'>{item.attributes.msg}</small>
                    </div>
                  </Fragment>
                </div>
              </a>
              <a className='px-1' href='/' onClick={e => handleDeleteNoti(e, item.id)}>
                <Trash2 />
              </a>
            </div>
          )
        })}
      </PerfectScrollbar>
    )
  }



  /*eslint-enable */
  useEffect(() => {
    dispatch(getAllData())
    console.log('unread', unread)
    setInterval(() => {
      dispatch(getAllData())
      console.log('checking...')
    }, 60000)

  }, [store.notifications])
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
          {store.unreadCount}
        </Badge>
      </DropdownToggle>
      <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {store.unreadCount} New
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        {/* <li className='dropdown-menu-footer'>
          <Button color='primary' block>
            Read all notifications
          </Button>
        </li> */}
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
