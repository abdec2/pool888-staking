// ** React Imports
import { useState, Fragment, useEffect } from 'react'

// ** Reactstrap Imports
import { Row, Col, Card, Form, CardBody, Button, Badge, Modal, Input, Label, ModalBody, ModalHeader } from 'reactstrap'

// ** Third Party Components
import Swal from 'sweetalert2'
import Select from 'react-select'
import { Check, X } from 'react-feather'
import { useForm, Controller } from 'react-hook-form'
import withReactContent from 'sweetalert2-react-content'
import { updateEmployeeStatus, updateEmployee, getEmployee } from './../../store'
import { getAllData } from './../../../company/store'
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'

import '@styles/react/libs/flatpickr/flatpickr.scss'


// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { selectThemeColors } from '@utils'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'

const statusColors = {
  active: 'light-success',
  pending: 'light-warning',
  inactive: 'light-secondary'
}

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' }
]


const countryOptions = [
  { label: "Select Nationality", value: "" },
  { label: "Afghanistan", value: "Afghanistan" },
  { label: "Åland Islands", value: "Åland Islands" },
  { label: "Albania", value: "Albania" },
  { label: "Algeria", value: "Algeria" },
  { label: "American Samoa", value: "American Samoa" },
  { label: "Andorra", value: "Andorra" },
  { label: "Angola", value: "Angola" },
  { label: "Anguilla", value: "Anguilla" },
  { label: "Antarctica", value: "Antarctica" },
  { label: "Antigua and Barbuda", value: "Antigua and Barbuda" },
  { label: "Argentina", value: "Argentina" },
  { label: "Armenia", value: "Armenia" },
  { label: "Aruba", value: "Aruba" },
  { label: "Australia", value: "Australia" },
  { label: "Austria", value: "Austria" },
  { label: "Azerbaijan", value: "Azerbaijan" },
  { label: "Bahamas (the)", value: "Bahamas (the)" },
  { label: "Bahrain", value: "Bahrain" },
  { label: "Bangladesh", value: "Bangladesh" },
  { label: "Barbados", value: "Barbados" },
  { label: "Belarus", value: "Belarus" },
  { label: "Belgium", value: "Belgium" },
  { label: "Belize", value: "Belize" },
  { label: "Benin", value: "Benin" },
  { label: "Bermuda", value: "Bermuda" },
  { label: "Bhutan", value: "Bhutan" },
  { label: "Bolivia (Plurinational State of)", value: "Bolivia (Plurinational State of)" },
  { label: "Bonaire, Sint Eustatius and Saba", value: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina", value: "Bosnia and Herzegovina" },
  { label: "Botswana", value: "Botswana" },
  { label: "Bouvet Island", value: "Bouvet Island" },
  { label: "Brazil", value: "Brazil" },
  { label: "British Indian Ocean Territory (the)", value: "British Indian Ocean Territory (the)" },
  { label: "Brunei Darussalam", value: "Brunei Darussalam" },
  { label: "Bulgaria", value: "Bulgaria" },
  { label: "Burkina Faso", value: "Burkina Faso" },
  { label: "Burundi", value: "Burundi" },
  { label: "Cabo Verde", value: "Cabo Verde" },
  { label: "Cambodia", value: "Cambodia" },
  { label: "Cameroon", value: "Cameroon" },
  { label: "Canada", value: "Canada" },
  { label: "Cayman Islands (the)", value: "Cayman Islands (the)" },
  { label: "Central African Republic (the)", value: "Central African Republic (the)" },
  { label: "Chad", value: "Chad" },
  { label: "Chile", value: "Chile" },
  { label: "China", value: "China" },
  { label: "Christmas Island", value: "Christmas Island" },
  { label: "Cocos (Keeling) Islands (the)", value: "Cocos (Keeling) Islands (the)" },
  { label: "Colombia", value: "Colombia" },
  { label: "Comoros (the)", value: "Comoros (the)" },
  { label: "Congo (the Democratic Republic of the)", value: "Congo (the Democratic Republic of the)" },
  { label: "Congo (the)", value: "Congo (the)" },
  { label: "Cook Islands (the)", value: "Cook Islands (the)" },
  { label: "Costa Rica", value: "Costa Rica" },
  { label: "Croatia", value: "Croatia" },
  { label: "Cuba", value: "Cuba" },
  { label: "Curaçao", value: "Curaçao" },
  { label: "Cyprus", value: "Cyprus" },
  { label: "Czechia", value: "Czechia" },
  { label: "Côte d'Ivoire", value: "Côte d'Ivoire" },
  { label: "Denmark", value: "Denmark" },
  { label: "Djibouti", value: "Djibouti" },
  { label: "Dominica", value: "Dominica" },
  { label: "Dominican Republic (the)", value: "Dominican Republic (the)" },
  { label: "Ecuador", value: "Ecuador" },
  { label: "Egypt", value: "Egypt" },
  { label: "El Salvador", value: "El Salvador" },
  { label: "Equatorial Guinea", value: "Equatorial Guinea" },
  { label: "Eritrea", value: "Eritrea" },
  { label: "Estonia", value: "Estonia" },
  { label: "Eswatini", value: "Eswatini" },
  { label: "Ethiopia", value: "Ethiopia" },
  { label: "Falkland Islands (the) [Malvinas]", value: "Falkland Islands (the) [Malvinas]" },
  { label: "Faroe Islands (the)", value: "Faroe Islands (the)" },
  { label: "Fiji", value: "Fiji" },
  { label: "Finland", value: "Finland" },
  { label: "France", value: "France" },
  { label: "French Guiana", value: "French Guiana" },
  { label: "French Polynesia", value: "French Polynesia" },
  { label: "French Southern Territories (the)", value: "French Southern Territories (the)" },
  { label: "Gabon", value: "Gabon" },
  { label: "Gambia (the)", value: "Gambia (the)" },
  { label: "Georgia", value: "Georgia" },
  { label: "Germany", value: "Germany" },
  { label: "Ghana", value: "Ghana" },
  { label: "Gibraltar", value: "Gibraltar" },
  { label: "Greece", value: "Greece" },
  { label: "Greenland", value: "Greenland" },
  { label: "Grenada", value: "Grenada" },
  { label: "Guadeloupe", value: "Guadeloupe" },
  { label: "Guam", value: "Guam" },
  { label: "Guatemala", value: "Guatemala" },
  { label: "Guernsey", value: "Guernsey" },
  { label: "Guinea", value: "Guinea" },
  { label: "Guinea-Bissau", value: "Guinea-Bissau" },
  { label: "Guyana", value: "Guyana" },
  { label: "Haiti", value: "Haiti" },
  { label: "Heard Island and McDonald Islands", value: "Heard Island and McDonald Islands" },
  { label: "Holy See (the)", value: "Holy See (the)" },
  { label: "Honduras", value: "Honduras" },
  { label: "Hong Kong", value: "Hong Kong" },
  { label: "Hungary", value: "Hungary" },
  { label: "Iceland", value: "Iceland" },
  { label: "India", value: "India" },
  { label: "Indonesia", value: "Indonesia" },
  { label: "Iran (Islamic Republic of)", value: "Iran (Islamic Republic of)" },
  { label: "Iraq", value: "Iraq" },
  { label: "Ireland", value: "Ireland" },
  { label: "Isle of Man", value: "Isle of Man" },
  { label: "Israel", value: "Israel" },
  { label: "Italy", value: "Italy" },
  { label: "Jamaica", value: "Jamaica" },
  { label: "Japan", value: "Japan" },
  { label: "Jersey", value: "Jersey" },
  { label: "Jordan", value: "Jordan" },
  { label: "Kazakhstan", value: "Kazakhstan" },
  { label: "Kenya", value: "Kenya" },
  { label: "Kiribati", value: "Kiribati" },
  { label: "Korea (the Democratic People's Republic of)", value: "Korea (the Democratic People's Republic of)" },
  { label: "Korea (the Republic of)", value: "Korea (the Republic of)" },
  { label: "Kuwait", value: "Kuwait" },
  { label: "Kyrgyzstan", value: "Kyrgyzstan" },
  { label: "Lao People's Democratic Republic (the)", value: "Lao People's Democratic Republic (the)" },
  { label: "Latvia", value: "Latvia" },
  { label: "Lebanon", value: "Lebanon" },
  { label: "Lesotho", value: "Lesotho" },
  { label: "Liberia", value: "Liberia" },
  { label: "Libya", value: "Libya" },
  { label: "Liechtenstein", value: "Liechtenstein" },
  { label: "Lithuania", value: "Lithuania" },
  { label: "Luxembourg", value: "Luxembourg" },
  { label: "Macao", value: "Macao" },
  { label: "Madagascar", value: "Madagascar" },
  { label: "Malawi", value: "Malawi" },
  { label: "Malaysia", value: "Malaysia" },
  { label: "Maldives", value: "Maldives" },
  { label: "Mali", value: "Mali" },
  { label: "Malta", value: "Malta" },
  { label: "Marshall Islands (the)", value: "Marshall Islands (the)" },
  { label: "Martinique", value: "Martinique" },
  { label: "Mauritania", value: "Mauritania" },
  { label: "Mauritius", value: "Mauritius" },
  { label: "Mayotte", value: "Mayotte" },
  { label: "Mexico", value: "Mexico" },
  { label: "Micronesia (Federated States of)", value: "Micronesia (Federated States of)" },
  { label: "Moldova (the Republic of)", value: "Moldova (the Republic of)" },
  { label: "Monaco", value: "Monaco" },
  { label: "Mongolia", value: "Mongolia" },
  { label: "Montenegro", value: "Montenegro" },
  { label: "Montserrat", value: "Montserrat" },
  { label: "Morocco", value: "Morocco" },
  { label: "Mozambique", value: "Mozambique" },
  { label: "Myanmar", value: "Myanmar" },
  { label: "Namibia", value: "Namibia" },
  { label: "Nauru", value: "Nauru" },
  { label: "Nepal", value: "Nepal" },
  { label: "Netherlands (the)", value: "Netherlands (the)" },
  { label: "New Caledonia", value: "New Caledonia" },
  { label: "New Zealand", value: "New Zealand" },
  { label: "Nicaragua", value: "Nicaragua" },
  { label: "Niger (the)", value: "Niger (the)" },
  { label: "Nigeria", value: "Nigeria" },
  { label: "Niue", value: "Niue" },
  { label: "Norfolk Island", value: "Norfolk Island" },
  { label: "Northern Mariana Islands (the)", value: "Northern Mariana Islands (the)" },
  { label: "Norway", value: "Norway" },
  { label: "Oman", value: "Oman" },
  { label: "Pakistan", value: "Pakistan" },
  { label: "Palau", value: "Palau" },
  { label: "Palestine, State of", value: "Palestine, State of" },
  { label: "Panama", value: "Panama" },
  { label: "Papua New Guinea", value: "Papua New Guinea" },
  { label: "Paraguay", value: "Paraguay" },
  { label: "Peru", value: "Peru" },
  { label: "Philippines (the)", value: "Philippines (the)" },
  { label: "Pitcairn", value: "Pitcairn" },
  { label: "Poland", value: "Poland" },
  { label: "Portugal", value: "Portugal" },
  { label: "Puerto Rico", value: "Puerto Rico" },
  { label: "Qatar", value: "Qatar" },
  { label: "Republic of North Macedonia", value: "Republic of North Macedonia" },
  { label: "Romania", value: "Romania" },
  { label: "Russian Federation (the)", value: "Russian Federation (the)" },
  { label: "Rwanda", value: "Rwanda" },
  { label: "Réunion", value: "Réunion" },
  { label: "Saint Barthélemy", value: "Saint Barthélemy" },
  { label: "Saint Helena, Ascension and Tristan da Cunha", value: "Saint Helena, Ascension and Tristan da Cunha" },
  { label: "Saint Kitts and Nevis", value: "Saint Kitts and Nevis" },
  { label: "Saint Lucia", value: "Saint Lucia" },
  { label: "Saint Martin (French part)", value: "Saint Martin (French part)" },
  { label: "Saint Pierre and Miquelon", value: "Saint Pierre and Miquelon" },
  { label: "Saint Vincent and the Grenadines", value: "Saint Vincent and the Grenadines" },
  { label: "Samoa", value: "Samoa" },
  { label: "San Marino", value: "San Marino" },
  { label: "Sao Tome and Principe", value: "Sao Tome and Principe" },
  { label: "Saudi Arabia", value: "Saudi Arabia" },
  { label: "Senegal", value: "Senegal" },
  { label: "Serbia", value: "Serbia" },
  { label: "Seychelles", value: "Seychelles" },
  { label: "Sierra Leone", value: "Sierra Leone" },
  { label: "Singapore", value: "Singapore" },
  { label: "Sint Maarten (Dutch part)", value: "Sint Maarten (Dutch part)" },
  { label: "Slovakia", value: "Slovakia" },
  { label: "Slovenia", value: "Slovenia" },
  { label: "Solomon Islands", value: "Solomon Islands" },
  { label: "Somalia", value: "Somalia" },
  { label: "South Africa", value: "South Africa" },
  { label: "South Georgia and the South Sandwich Islands", value: "South Georgia and the South Sandwich Islands" },
  { label: "South Sudan", value: "South Sudan" },
  { label: "Spain", value: "Spain" },
  { label: "Sri Lanka", value: "Sri Lanka" },
  { label: "Sudan (the)", value: "Sudan (the)" },
  { label: "Suriname", value: "Suriname" },
  { label: "Svalbard and Jan Mayen", value: "Svalbard and Jan Mayen" },
  { label: "Sweden", value: "Sweden" },
  { label: "Switzerland", value: "Switzerland" },
  { label: "Syrian Arab Republic", value: "Syrian Arab Republic" },
  { label: "Taiwan (Province of China)", value: "Taiwan (Province of China)" },
  { label: "Tajikistan", value: "Tajikistan" },
  { label: "Tanzania, United Republic of", value: "Tanzania, United Republic of" },
  { label: "Thailand", value: "Thailand" },
  { label: "Timor-Leste", value: "Timor-Leste" },
  { label: "Togo", value: "Togo" },
  { label: "Tokelau", value: "Tokelau" },
  { label: "Tonga", value: "Tonga" },
  { label: "Trinidad and Tobago", value: "Trinidad and Tobago" },
  { label: "Tunisia", value: "Tunisia" },
  { label: "Turkey", value: "Turkey" },
  { label: "Turkmenistan", value: "Turkmenistan" },
  { label: "Turks and Caicos Islands (the)", value: "Turks and Caicos Islands (the)" },
  { label: "Tuvalu", value: "Tuvalu" },
  { label: "Uganda", value: "Uganda" },
  { label: "Ukraine", value: "Ukraine" },
  { label: "United Arab Emirates (the)", value: "United Arab Emirates (the)" },
  { label: "United Kingdom of Great Britain and Northern Ireland (the)", value: "United Kingdom of Great Britain and Northern Ireland (the)" },
  { label: "United States Minor Outlying Islands (the)", value: "United States Minor Outlying Islands (the)" },
  { label: "United States of America (the)", value: "United States of America (the)" },
  { label: "Uruguay", value: "Uruguay" },
  { label: "Uzbekistan", value: "Uzbekistan" },
  { label: "Vanuatu", value: "Vanuatu" },
  { label: "Venezuela (Bolivarian Republic of)", value: "Venezuela (Bolivarian Republic of)" },
  { label: "Viet Nam", value: "Viet Nam" },
  { label: "Virgin Islands (British)", value: "Virgin Islands (British)" },
  { label: "Virgin Islands (U.S.)", value: "Virgin Islands (U.S.)" },
  { label: "Wallis and Futuna", value: "Wallis and Futuna" },
  { label: "Western Sahara", value: "Western Sahara" },
  { label: "Yemen", value: "Yemen" },
  { label: "Zambia", value: "Zambia" },
  { label: "Zimbabwe", value: "Zimbabwe" }
]

const MySwal = withReactContent(Swal)

const UserInfoCard = ({ selectedUser }) => {
  // ** State
  const [show, setShow] = useState(false)
  const [data, setData] = useState(null)
  const branches = useSelector(state => state.companies)
  const dispatch = useDispatch()
  console.log(selectedUser)

  const branchOptions = [{ value: '', label: 'Select Branch' }]
    branches.allData.map(item => {
    branchOptions.push({value:item.id.toString(), label: item.attributes.location})
  })

  // const defaultValues = {
  //   name: selectedUser.attributes.name,
  //   dob: selectedUser.attributes.dob,
  //   cpr: selectedUser.attributes.cpr,
  //   passport: selectedUser.attributes.passport,
  //   phone: selectedUser.attributes.phone,
  //   address: selectedUser.attributes.address,
  //   expatriate: String(selectedUser.attributes.expatriate),
  //   contractSigned: String(selectedUser.attributes.contractSigned), 
  //   nationality: selectedUser.attributes.nationality, 
  //   cr: String(selectedUser.attributes.cr.data.id),
  //   status: selectedUser.attributes.status
  // }

  // ** Hook
  const {
    reset,
    setValue,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({})

  const setFormValues = () => {
    setValue('name', selectedUser.attributes.name)
    setValue('dob', selectedUser.attributes.dob)
    setValue('cpr', selectedUser.attributes.cpr)
    setValue('passport', selectedUser.attributes.passport)
    setValue('phone', selectedUser.attributes.phone)
    setValue('address', selectedUser.attributes.address)
    setValue('expatriate', selectedUser.attributes.expatriate)
    setValue('contractSigned', selectedUser.attributes.contractSigned)
    setValue('nationality', selectedUser.attributes.nationality)
    setValue('cr', selectedUser.attributes.cr.data.id)
    setValue('status', selectedUser.attributes.status)
  }

  useEffect(() => {
    dispatch(getAllData())    
    setFormValues()
  }, [dispatch, selectedUser])

  // ** render user img
  const renderUserImg = () => {
    if (selectedUser !== null && selectedUser?.avatar?.length) {
      return (
        <img
          height='110'
          width='110'
          alt='user-avatar'
          src={selectedUser.avatar}
          className='img-fluid rounded mt-3 mb-2'
        />
      )
    } else {
      const stateNum = Math.floor(Math.random() * 6),
        states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
        color = states[stateNum]
      return (
        <Avatar
          initials
          color={color}
          className='rounded mt-3 mb-2'
          content={selectedUser.attributes.name}
          contentStyles={{
            borderRadius: 0,
            fontSize: 'calc(48px)',
            width: '100%',
            height: '100%'
          }}
          style={{
            height: '110px',
            width: '110px'
          }}
        />
      )
    }
  }

  const checkIsValid = data => {
    return Object.values(data).every(field => (field, typeof field === 'object' ? field !== null : typeof field === 'boolean' ? field !== '' : typeof field === 'number' ? field !== '' : field.length > 0))
    // Object.values(data).map(field => {
    //   console.log(field, typeof field === 'object' ? field !== null : typeof field === 'boolean' ? field !== '' : typeof field === 'number' ? field !== '' : field.length > 0)
    // })
  }
  const onSubmit = data => {
    setData(data)
    console.log(data)
    console.log(checkIsValid(data))
    if (checkIsValid(data)) {
      dispatch(updateEmployee({
        id: selectedUser.id,
        address: data.address,
        contractSigned: data.contractSigned === "true",
        cpr: data.cpr,
        dob: data.dob,
        expatriate: data.expatriate === "true",
        name: data.name,
        nationality: data.nationality,
        passport: data.passport,
        phone: data.phone,
        status: data.status, 
        cr: data.cr
      }))
      setShow(false)
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleReset = () => {
    reset({
      name: selectedUser.attributes.name,
      dob: selectedUser.attributes.dob,
      cpr: selectedUser.attributes.cpr,
      passport: selectedUser.attributes.passport,
      phone: selectedUser.attributes.phone,
      address: selectedUser.attributes.address,
      expatriate: String(selectedUser.attributes.expatriate),
      contractSigned: String(selectedUser.attributes.contractSigned), 
      nationality: selectedUser.attributes.nationality, 
      cr: String(selectedUser.attributes.cr.data.id),
      status: selectedUser.attributes.status
    })
  }

  const handleSuspendedClick = () => {
    return MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert user!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Suspend user!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-outline-danger ms-1'
      },
      buttonsStyling: false
    }).then(function (result) {
      if (result.value) {
        dispatch(updateEmployeeStatus({
          id: selectedUser.id,
          status: 'inactive'
        }))

      }

    })
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <div className='user-avatar-section'>
            <div className='d-flex align-items-center flex-column'>
              {renderUserImg()}
              <div className='d-flex flex-column align-items-center text-center'>
                <div className='user-info'>
                  <h4>{selectedUser !== null ? selectedUser.name : 'Eleanor Aguilar'}</h4>
                  {/* {selectedUser !== null ? (
                    <Badge color={roleColors[selectedUser.role]} className='text-capitalize'>
                      {selectedUser.role}
                    </Badge>
                  ) : null} */}
                </div>
              </div>
            </div>
          </div>
          
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>Details</h4>
          <div className='info-container'>
            {selectedUser !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Name:</span>
                  <span>{selectedUser.attributes.name}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Date of Birth:</span>
                  <span>{moment(selectedUser.attributes.dob).format("dddd, MMMM Do YYYY")}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>CPR:</span>
                  <span className='text-capitalize'>{selectedUser.attributes.cpr}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Status:</span>
                  <Badge className='text-capitalize' color={statusColors[selectedUser.attributes.status]}>
                    {selectedUser.attributes.status}
                  </Badge>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Nationality:</span>
                  <span>{selectedUser.attributes.nationality}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Passport:</span>
                  <span>{selectedUser.attributes.passport}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Phone:</span>
                  <span>{selectedUser.attributes.phone}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Branch:</span>
                  <span className='text-capitalize'>{selectedUser.attributes.cr.data.attributes.location}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Contract Signed:</span>
                  <span>{(selectedUser.attributes.contractSigned) ? 'Yes' : 'No'}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>Address:</span>
                  <span>{selectedUser.attributes.address}</span>
                </li>
              </ul>
            ) : null}
          </div>
          <div className='d-flex justify-content-center pt-2'>
            <Button color='primary' onClick={() => setShow(true)}>
              Edit
            </Button>
            <Button disabled={selectedUser.attributes.status === 'inactive'} className='ms-1' color='danger' outline onClick={handleSuspendedClick}>
              Suspended
            </Button>
          </div>
        </CardBody>
      </Card>
      <Modal isOpen={show} toggle={() => setShow(!show)} backdrop={false} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(false)}></ModalHeader>
        <ModalBody className='px-sm-5 pt-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit Employee Information</h1>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row className='gy-1 pt-75'>
              <Col md={6} xs={12}>
                <Label className='form-label' for='fullName'>
                  Full Name <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='name'
                  control={control}
                  render={({ field }) => (
                    <Input id='name' placeholder='Enter employee name' invalid={errors.name && true} {...field} />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='dob'>
                  Date of Birth <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='dob'
                  control={control}
                  render={({ field }) => (
                    <Flatpickr className={classnames('form-control', { 'is-invalid': data !== null && data.dob === '' })} id='dob' onChange={value => setValue('dob', value[0] || '')}  defaultValue={selectedUser.attributes.dob} />
                  )}
                />
              </Col>

              <Col xs={12} >
                <Label className='form-label' for='cpr'>
                  CPR No <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='cpr'
                  control={control}
                  render={({ field }) => (
                    <Input
                      type='text'
                      id='cpr'
                      placeholder='Enter employee CPR '
                      invalid={errors.cpr && true}
                      {...field}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className='form-label' for='passport'>
                  Passport No <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='passport'
                  control={control}
                  render={({ field }) => (
                    <Input id='passport' placeholder='Enter employee passport number' invalid={errors.passport && true} {...field} />
                  )}
                />
              </Col>
              <Col md={6} xs={12} >
                <Label className='form-label' for='phone'>
                  Phone <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='phone'
                  control={control}
                  render={({ field }) => (
                    <Input id='phone' placeholder='Employee phone number' invalid={errors.phone && true} {...field} />
                  )}
                />
              </Col>
              <Col xs={12}>
                <Label className='form-label' for='nationality'>
                  Nationality <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='nationality'
                  control={control}
                  render={({ field }) => (
                    // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                    <Select
                      isClearable={false}
                      classNamePrefix='select'
                      options={countryOptions}
                      theme={selectThemeColors}
                      defaultValue={countryOptions[countryOptions.findIndex(i => i.value === selectedUser.attributes.nationality)]}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.nationality === '' })}
                      onChange={value => setValue('nationality', value.value)}
                    />
                  )}
                />
              </Col>

              <Col md={6} xs={12}>
                <Label className='form-label' for='select-expatriate'>
                  Expatriate <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='expatriate'
                  control={control}
                  render={({ field }) => (
                    <Input type='select' id='expatriate' name='expatriate' invalid={errors.expatriate && true} {...field} >
                      <option value=''>Select...</option>
                      <option value='true'>True</option>
                      <option value='false'>False</option>
                    </Input>
                  )}
                />

              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='contractSigned'>
                  Contract Signed <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='contractSigned'
                  control={control}
                  render={({ field }) => (
                    <Input type='select' id='contractSigned' name='contractSigned' invalid={errors.contractSigned && true} {...field}>
                      <option value=''>Select...</option>
                      <option value='true'>True</option>
                      <option value='false'>False</option>
                    </Input>
                  )}
                />
              </Col>

              <Col xs={12}>
                <Label className='form-label' for='address'>
                  Address <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='address'
                  control={control}
                  render={({ field }) => (
                    <Input id='address' type="textarea" placeholder='Employee Address' invalid={errors.address && true} {...field} />
                  )}
                />

              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='cr'>
                  Branch <span className='text-danger'>*</span>
                </Label>
                <Controller
                  name='cr'
                  control={control}
                  render={({ field }) => (
                    // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                    <Select
                      id='cr'
                      isClearable={false}
                      classNamePrefix='select'
                      options={branchOptions}
                      theme={selectThemeColors}
                      defaultValue={branchOptions[branchOptions.findIndex(i => parseInt(i.value) === selectedUser.attributes.cr.data.id)]}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.cr === '' })}
                      onChange={value => setValue('cr', value.value)}
                    />
                  )}
                />
              </Col>
              <Col md={6} xs={12}>
                <Label className='form-label' for='status'>
                  Status:
                </Label>
                <Controller
                  name='status'
                  control={control}
                  render={({ field }) => (
                    // <Input id='country' placeholder='Australia' invalid={errors.country && true} {...field} />
                    <Select
                      id='status'
                      isClearable={false}
                      className={classnames('react-select', { 'is-invalid': data !== null && data.status === '' })}
                      classNamePrefix='select'
                      options={statusOptions}
                      theme={selectThemeColors}
                      defaultValue={statusOptions[statusOptions.findIndex(i => i.value === selectedUser.attributes.status)]}
                      onChange={value => setValue('status', value.value)}
                    />
                  )}
                />

              </Col>
              <Col xs={12} className='text-center mt-2 pt-50'>
                <Button type='submit' className='me-1' color='primary'>
                  Submit
                </Button>
                <Button
                  type='reset'
                  color='secondary'
                  outline
                  onClick={() => {
                    handleReset()
                    setShow(false)
                  }}
                >
                  Discard
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default UserInfoCard
