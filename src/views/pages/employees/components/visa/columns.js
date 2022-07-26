// ** React Imports
import { Link } from 'react-router-dom'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Store & Actions
import { store } from '@store/store'
import { getVisa, deleteVisa, toggleEditModal } from '../../store/index'

// ** Icons Imports
import { Edit2, MoreVertical, Trash2 } from 'react-feather'

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
    return <Avatar color={color || 'primary'} className='me-1' content={row.attributes.employee.data.attributes.name || 'John Doe'} initials />
  }
}


const statusObj = {
  applied: 'light-warning',
  valid: 'light-success',
  invalid: 'light-secondary'
}

export const columns = [
  {
    name: 'Employee',
    sortable: true,
    minWidth: '200px',
    sortField: 'employee.name',
    selector: row => row.attributes.employee.data.attributes.name,
    cell: row => (
      <div role="button" className='d-flex justify-content-left align-items-center'>
        {renderClient(row)}
        <div className='d-flex flex-column'>
          <div
            // to={`/employee/view/${row.id}`}
            className='user_name text-truncate text-body'
            // onClick={() => store.dispatch(getEmployee(row.id))}
            onClick={async () => {
              await store.dispatch(getVisa(row.id))
              store.dispatch(toggleEditModal())
            }}
          >
            <span className='fw-bolder'>{row.attributes.employee.data.attributes.name}</span>
          </div>
          {/* <small className='text-truncate text-muted mb-0'>{row.email}</small> */}
        </div>
      </div>
    )
  },
  {
    name: 'CPR No',
    sortable: true,
    minWidth: '150px',
    sortField: 'employee.cpr',
    selector: row => row.attributes.employee.data.attributes.cpr,
    cell: row => <span className='text-capitalize'>{row.attributes.employee.data.attributes.cpr}</span>
  },
  {
    name: 'Passport #',
    minWidth: '150px',
    sortable: true,
    sortField: 'employee.passport',
    selector: row => row.attributes.employee.data.attributes.passport,
    cell: row => <span className='text-capitalize'>{row.attributes.employee.data.attributes.passport}</span>
  },
  {
    name: 'RP #',
    minWidth: '150px',
    sortable: true,
    sortField: 'rp_no',
    selector: row => row.attributes.rp_no,
    cell: row => <span className='text-capitalize'>{row.attributes.rp_no}</span>
  },
  {
    name: 'RP Issue Date',
    minWidth: '230px',
    sortable: true,
    sortField: 'rp_issue',
    selector: row => row.attributes.rp_issue,
    cell: row => <span className='text-capitalize'>{row.attributes.rp_issue}</span>
  },
  {
    name: 'RP Expiry Date',
    minWidth: '230px',
    sortable: true,
    sortField: 'rp_expiry',
    selector: row => row.attributes.rp_expiry,
    cell: row => <span className='text-capitalize'>{row.attributes.rp_expiry}</span>
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
              className='w-100'
              onClick={async () => {
                await store.dispatch(getVisa(row.id))
                store.dispatch(toggleEditModal())
              }}
            >
              <Edit2 size={14} className='me-50' />
              <span className='align-middle'>Edit</span>
            </DropdownItem>
            <DropdownItem
              className='w-100'
              onClick={e => {
                e.preventDefault()
                confirmAlert().then(result => {
                  if (result.value) {
                    store.dispatch(deleteVisa(row.id))
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
