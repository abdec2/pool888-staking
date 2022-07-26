import Table from './components/visa/Table'

import '@styles/react/apps/app-users.scss'
const Visa = () => {
  return (
    <div className='app-user-list'>
      <div className='mt-4 mb-2' ><h1>Employee Visas</h1></div>
      <Table />
    </div>
  )
}

export default Visa