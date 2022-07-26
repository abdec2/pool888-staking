import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home'))
  },
  {
    path: '/second-page',
    component: lazy(() => import('../../views/SecondPage'))
  },
  {
    path: '/login',
    component: lazy(() => import('../../views/Login')),
    layout: 'BlankLayout',
    meta: {
      authRoute: true
    }
  },
  {
    path: '/error',
    component: lazy(() => import('../../views/Error')),
    layout: 'BlankLayout'
  }, 
  {
    path: '/employees/view',
    component: lazy(() => import('../../views/pages/employees/Employees'))
    
  },
  {
    path: '/employee/view/:id',
    component: lazy(() => import('../../views/pages/employees/EmployeeView'))
  },
  {
    path: '/employees/visa',
    component: lazy(() => import('../../views/pages/employees/Visa'))
    
  }, 
  {
    path: '/employees/working',
    component: lazy(() => import('../../views/pages/employees/WorkingHours'))
    
  }, 
  {
    path: '/employees/gosi',
    component: lazy(() => import('../../views/pages/employees/GosiDetails'))
    
  }, 
  {
    path: '/employees/request',
    component: lazy(() => import('../../views/pages/employees/Request'))
    
  }, 
  {
    path: '/cr-details',
    component: lazy(() => import('../../views/pages/company/CrDetails'))
    
  }, 
  {
    path: '/rules',
    component: lazy(() => import('../../views/pages/company/Rules'))
    
  }
]

export { DefaultRoute, TemplateTitle, Routes }
