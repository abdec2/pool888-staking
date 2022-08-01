import { Home } from 'react-feather'
import Fire from "../../icons/fire"
import Tree from '../../icons/tree'

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home'
  }, 
  {
    id: 'pools', 
    title: 'Pools', 
    navLink: '/pools',
    icon: <Tree height={20} width={20} color="#d0d2d6"/>
  }, 
  {
    id: 'farms', 
    title: 'Farms', 
    navLink: '/farms',
    icon: <Fire height={20} width={20} color="#d0d2d6" />
    
  }
]
