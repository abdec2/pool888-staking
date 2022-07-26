// ** React Import
import { useState } from 'react'

// ** Custom Components
import Sidebar from '@components/sidebar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Third Party Components
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import Flatpickr from 'react-flatpickr'

import '@styles/react/libs/flatpickr/flatpickr.scss'

// ** Reactstrap Imports
import { Button, Label, Form, Input } from 'reactstrap'

// ** Store & Actions
import { addVisa } from '../../store'
import { useDispatch } from 'react-redux'
import moment from 'moment'

const defaultValues = {
  rp_no: '',
  rp_issue: '',
  rp_expiry: '',
  employee: ''
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar, employeeOptions }) => {
  // ** States
  const [data, setData] = useState(null)
  const [rp_issue, set_rp_issue] = useState(new Date())
  const [rp_expiry, set_rp_expiry] = useState(new Date())

  // ** Store Vars
  const dispatch = useDispatch()

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** Function to handle form submit
  const onSubmit = data => {
    setData(data)
    console.log(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      dispatch(
        addVisa({
          rp_no: data.rp_no,
          rp_issue: data.rp_issue[0].toISOString(),
          rp_expiry: data.rp_expiry[0].toISOString(),
          employee:  data.employee.value,
          status: (moment(data.rp_expiry[0]).diff(data.rp_issue[0], 'days') > 0) ? 'valid' : 'invalid'
        })
      )
    } else {
      for (const key in data) {
        if (data[key] === '') {
          setError(`"${key}"`, {
            type: "manual"
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }

  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='Add Visa'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      backdrop={false}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='employee'>
            Employee <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='employee'
            control={control}
            render={({ field }) => (
              // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={employeeOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.employee === '' })}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='rp_no'>
            RP No <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='rp_no'
            control={control}
            render={({ field }) => (
              <Input id='rp_no' placeholder='Enter RP Number' invalid={errors.rp_no && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='rp_issue'>
            RP Issue <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='rp_issue'
            control={control}
            render={({ field }) => (
              <Flatpickr className={classnames('form-control', { 'is-invalid': data !== null && data.rp_issue === '' })} id='rp_issue' {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='rp_expiry'>
            RP Expiry <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='rp_expiry'
            control={control}
            render={({ field }) => (
              <Flatpickr className={classnames('form-control', { 'is-invalid': data !== null && data.rp_expiry === '' })} id='rp_expiry' {...field} />
            )}
          />
        </div>
       

        <Button type='submit' className='me-1' color='primary'>
          Submit
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancel
        </Button>
      </Form>
    </Sidebar>
  )
}

export default SidebarNewUsers
