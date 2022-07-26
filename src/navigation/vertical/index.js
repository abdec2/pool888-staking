import { Home, Users, CreditCard, Clock, Shield, FilePlus, FileText, Layers } from 'react-feather'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  },
  {
    header: 'Employees'
  },
  
  {
    id: 'view_employees', 
    title: 'Employees', 
    navLink: '/employees/view',
    icon: <Users size={20} />
  }, 
  {
    id: 'employees_visa', 
    title: 'Employee Visa', 
    navLink: '/employees/visa',
    icon: <CreditCard size={20} />
    
  }, 
  // {
  //   id: 'working_hours', 
  //   title: 'Working Hours', 
  //   navLink: '/employees/working', 
  //   icon: <Clock size={20} />
    
  // },
  // {
  //   id: 'gosi', 
  //   title: 'GOSI', 
  //   navLink: '/employees/gosi', 
  //   icon: <Shield size={20} />
    
  // },
  // {
  //   id: 'request', 
  //   title: 'Requests', 
  //   navLink: '/employees/request',
  //   icon: <FilePlus size={20} />
    
  // },
    
 
  {
    header: 'Company Details'
  },
  {
    id: 'cr_details',
    title: 'CR Details',
    icon: <Layers size={20} />,
    navLink: '/cr-details'
    
  },
  {
    id: 'rulesPolicy',
    title: 'Rules & Policy',
    icon: <FileText size={20} />,
    navLink: '/rules'
    
  }
]
