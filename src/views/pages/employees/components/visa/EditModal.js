import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'

import { selectThemeColors } from '@utils'


import { toggleEditModal, updateVisa } from './../../store'
import { useEffect, useState } from "react"

import '@styles/react/libs/flatpickr/flatpickr.scss'

const EditModal = ({store}) => {
    
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)

    const checkIsValid = data => {
        return Object.values(data).map(field => (typeof field === 'object' ? field !== null : field.length > 0))
    }

    const {
        reset,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
        }
    })

    const onSubmit = data => {
        setData(data)
        console.log(data)
        if (checkIsValid(data)) {
            dispatch(toggleEditModal())
            dispatch(updateVisa({
                id: store.selectedVisa.data.id,
                rp_no: data.rp_no,
                rp_issue: data.rp_issue, 
                rp_expiry: data.rp_expiry
            }))
        } else {
            for (const key in data) {
                if (data[key] === '') {
                    setError(`"${key}"`, {
                        type: "manual"
                    })
                }
                if (data[key] !== null && data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }

    }

    useEffect(() => {
        if (store.selectedVisa) {
            setValue("rp_no", store.selectedVisa.data.attributes.rp_no)
            setValue("rp_issue", store.selectedVisa.data.attributes.rp_issue)
            setValue("rp_expiry", store.selectedVisa.data.attributes.rp_expiry)
        }
    }, [store.selectedVisa])
    return (
        <Modal isOpen={store.editModal} toggle={() => dispatch(toggleEditModal())} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() => dispatch(toggleEditModal())}></ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit Visa Information</h1>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col xs={12}>
                            <Label className='form-label' for='rp_no'>
                                RP No
                            </Label>
                            <Controller
                                control={control}
                                id='rp_no'
                                name='rp_no'
                                render={({ field }) => (
                                    <Input id='rp_no' placeholder='RP Number' invalid={errors.rp_no && true} {...field}  />
                                )}
                                // defaultValue={store.selectedVisa?.data.attributes.rp_no} onChange={value => setValue('rp_no', value.target.value)}
                            />
                        </Col>
                        
                        <Col xs={12}>
                            <Label className='form-label' for='rp_issue'>
                                RP Issue Date
                            </Label>
                            <Controller
                                control={control}
                                id='rp_issue'
                                name='rp_issue'
                                render={({ field }) => (
                                    <Flatpickr className={classnames('form-control', { 'is-invalid': data !== null && data.rp_issue === '' })} id='rp_issue' onChange={value => setValue('rp_issue', value[0].toISOString())} 
                                    defaultValue={store.selectedVisa?.data.attributes.rp_issue} />
                                   
                                )}
                            />
                        </Col>

                        <Col xs={12}>
                            <Label className='form-label' for='rp_expiry'>
                                RP Expiry Date
                            </Label>
                            <Controller
                                control={control}
                                id='rp_expiry'
                                name='rp_expiry'
                                render={({ field }) => (
                                    <Flatpickr 
                                    className={classnames('form-control', { 'is-invalid': data !== null && data.rp_expiry?.length === 0 })} 
                                    id='rp_expiry' 
                                    onChange={value => setValue('rp_expiry', value[0].toISOString())} 
                                    defaultValue={store.selectedVisa?.data.attributes.rp_expiry} />
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
                                    dispatch(toggleEditModal())
                                }}
                            >
                                Cancel
                            </Button>
                        </Col>
                                   
                        
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default EditModal