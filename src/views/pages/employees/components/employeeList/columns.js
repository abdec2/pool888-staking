// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getEmployee, deleteEmployee } from '../../store/index'

// ** Icons Imports
import { Slack, User, Settings, Database, Edit2, MoreVertical, FileText, Trash2, Archive } from 'react-feather'

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

import { confirmAlert } from '../../../../components/alert'

// ** Renders Client Columns
const renderClient = row => {
  const stateNum = Math.floor(Math.random() * 6),
    states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
    color = states[stateNum]

  if (row?.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />
  } else {
    return <Avatar color={color || 'primary'} className='me-1' content={row.attributes.name || 'John Doe'} initials />
  }
}


const statusObj = {
  pending: 'light-warning',
  active: 'light-success',
  inactive: 'light-secondary'
}

export const columns = [
  {
    name: 'Employee',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.attributes.name,
    cell: row => (
      <div className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <Link
            to={`/employee/view/${row.id}`}
            className='user_name text-truncate text-body'
            onClick={() => store.dispatch(getEmployee(row.id))}
          >
            <span className='fw-bolder'>{row.attributes.name}</span>
          </Link>
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'CPR No',
    sortable: true,
    minWidth: '172px',
    sortField: 'cpr',
    selector: row => row.attributes.cpr,
    cell: row => <span className='text-capitalize'>{row.attributes.cpr}</span>
  },
  {
    name: 'Phone',
    minWidth: '138px',
    sortable: true,
    sortField: 'phone',
    selector: row => row.attributes.phone,
    cell: row => <span className='text-capitalize'>{row.attributes.phone}</span>
  },
  {
    name: 'Branch',
    minWidth: '230px',
    sortable: true,
    sortField: 'cr.id',
    selector: row => row.attributes.cr.data.id,
    cell: row => <span className='text-capitalize'>{row.attributes.cr.data.attributes.location}</span>
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.attributes.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.attributes.status]} pill>
        {row.attributes.status}
      </Badge>
    )
  },
  {
    name: 'Actions',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/employee/view/${row.id}`}
              onClick={() => store.dispatch(getEmployee(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                confirmAlert().then(result => {
                  if (result.value) {
                    store.dispatch(deleteEmployee(row.id))
                  }
                })
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  }
]
