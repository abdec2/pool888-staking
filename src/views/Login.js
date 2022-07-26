import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'

import { handleLogin } from '../redux/authentication'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { toast, Slide } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { AbilityContext } from '@src/utility/context/Can'
import { Fragment, useContext, useState } from 'react'
import { getUserAbility } from '../utility/Utils'
import { Coffee } from 'react-feather'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as an {role} user to Arab Vape HRMS. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const defaultValues = {
  "login-email": '', 
  "login-password":''
}

const host = process.env.REACT_APP_HOST

const LoginCover = () => {
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const history = useHistory()
  const ability = useContext(AbilityContext)
  const [err, setErr] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({defaultValues})

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {

      axios.post(`${host}/api/auth/local`, {
        identifier : data["login-email"],
        password : data["login-password"]
      }).then(res => {
        const data = {...res.data.user, token: res.data.jwt }
        dispatch(handleLogin(data))
        ability.update(getUserAbility('admin'))
        history.push('/')
        toast.success(
                <ToastContent name={data.username || data.email || 'John Doe'} role={'admin'} />,
                { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
              )
      }).catch((err) => {
        console.log(err)
        if (err) {
          setErr(true)
          setErrMsg(err.response.data.error.message)
        }
      })

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


  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h2 className='brand-text text-primary ms-1'>ARAB VAPE</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to HRMS!
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account </CardText>
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Controller 
                  control={control}
                  name="login-email"
                  id="login-email" 
                  render={({field}) => (
                    <Input type='text' placeholder='username or email' autoFocus invalid={errors.email && true} {...field} />
                  )}
                />  
              </div>
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                </div>
                <Controller 
                  control={control}
                  name="login-password"
                  id="login-password"
                  render={({field}) => (
                    <InputPasswordToggle className='input-group-merge' invalid={errors.password && true} {...field} />
                  )}
                />
              </div>

              <Button color='primary' type='submit' block >
                Sign in
              </Button>

              {err && (
                <p className='mt-1 text-danger text-center'>{errMsg}</p>
              )}

            </Form>

          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default LoginCover
