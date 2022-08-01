// ** React Imports
import { Fragment, useEffect } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'

// ** Third Party Components
import { Menu, ChevronLeft } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink, Button } from 'reactstrap'

import { connectWallet, disconnectWallet } from './../../redux/connectWallet'
import { useDispatch, useSelector } from 'react-redux'


const ThemeNavbar = props => {
  // ** Props
  const { skin, setSkin, setMenuVisibility } = props
  const store = useSelector(state => state.ConnectWallet)
  console.log(store)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(store)
  }, [])
  return (
    <Fragment>
      <ul className='navbar-nav d-xl-none'>
        <NavItem className='mobile-menu me-auto d-flex align-items-center'>
          <NavLink className='nav-menu-main menu-toggle hidden-xs is-active' onClick={() => setMenuVisibility(true)}>
            <Menu className='ficon' />
          </NavLink>
        </NavItem>
      </ul>
      {!store.account && (
        <Button.Ripple color='primary' className="ms-auto d-flex align-items-center justify-content-center" onClick={() => dispatch(connectWallet())}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={20} fill="white" className='me-1'>
            <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
          </svg>
          Connect Wallet
        </Button.Ripple>
      )}
      {store.account && (
        <Button.Ripple color='primary' className="ms-auto d-flex align-items-center justify-content-center" onClick={() => dispatch(disconnectWallet())}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" height={20} fill="white" className='me-1'>
            <path d="M448 32C465.7 32 480 46.33 480 64C480 81.67 465.7 96 448 96H80C71.16 96 64 103.2 64 112C64 120.8 71.16 128 80 128H448C483.3 128 512 156.7 512 192V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM416 336C433.7 336 448 321.7 448 304C448 286.3 433.7 272 416 272C398.3 272 384 286.3 384 304C384 321.7 398.3 336 416 336z" />
          </svg>
          {/* {`${store.account.slice(0, 5)} ... ${store.account.slice(37, 42)}`} */}
          Disconnect
        </Button.Ripple>
      )}
      {/* <NavbarUser skin={skin} setSkin={setSkin} /> */}
    </Fragment>
  )
}

export default ThemeNavbar
