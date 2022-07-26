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
import { addCr } from './../store'
import { useDispatch } from 'react-redux'

const defaultValues = {
  location: '', 
  cr: '',
  expiry: "",
  timings: '',
  phone: '',
  address: ''
}

const checkIsValid = data => {
  return Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))
}

const SidebarNewUsers = ({ open, toggleSidebar }) => {
  // ** States
  const [data, setData] = useState(null)

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
        addCr({
          location: data.location, 
          cr: data.cr,
          expiry: data.expiry[0],
          timings: data.timings,
          phone: data.phone,
          address: data.address,
          status: 'active'
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
      title='Add CR'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
      backdrop={false}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='location'>
            Location <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='location'
            control={control}
            render={({ field }) => (
              <Input id='location' placeholder='Enter Location' invalid={errors.location && true} {...field} />
            )}
          />
        </div>
        
        <div className='mb-1'>
          <Label className='form-label' for='cr'>
            CR No <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='cr'
            control={control}
            render={({ field }) => (
              <Input
                type='text'
                id='cr'
                placeholder='Enter employee CPR '
                invalid={errors.cr && true}
                {...field}
              />
            )}
          />
        </div>

        <div className='mb-1'>
          <Label className='form-label' for='expiry'>
            CR Expiry <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='expiry'
            control={control}
            render={({ field }) => (
              <Flatpickr options={{minDate: "today"}} className={classnames('form-control', { 'is-invalid': data !== null && data.expiry === '' })} id='expiry' {...field} />
            )}
          />
        </div>

        
        <div className='mb-1'>
          <Label className='form-label' for='phone'>
            Phone <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input id='phone' placeholder='Branch phone number' invalid={errors.phone && true} {...field} />
            )}
          />
        </div>
      
        <div className='mb-1'>
          <Label className='form-label' for='address'>
            Address <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <Input id='address' type="textarea" placeholder='Enter Branch Address' invalid={errors.address && true} {...field} />
            )}
          />

        </div>

        <div className='mb-1'>
          <Label className='form-label' for='timings'>
            Branch timings <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='timings'
            control={control}
            render={({ field }) => (
              <Input id='timings' placeholder='Branch Timings' invalid={errors.timings && true} {...field} />
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
