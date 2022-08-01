import { lazy } from 'react'

// ** Document title
const TemplateTitle = '%s - Vuexy React Admin Template'

// ** Default Route
const DefaultRoute = '/home'

// ** Merge Routes
const Routes = [
  {
    path: '/home',
    component: lazy(() => import('../../views/Home')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/pools',
    component: lazy(() => import('../../views/pages/pool')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/farms',
    component: lazy(() => import('../../views/pages/farm')),
    meta: {
      publicRoute: true
    }
  }
  
]

export { DefaultRoute, TemplateTitle, Routes }
