import { Controller, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import Select from 'react-select'
import { Button, Col, Form, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap"
import Flatpickr from 'react-flatpickr'
import classnames from 'classnames'

import { selectThemeColors } from '@utils'


import { toggleEditModal, updateCr, getCR } from './../store'
import { useEffect, useState } from "react"

import '@styles/react/libs/flatpickr/flatpickr.scss'

const EditModal = () => {
    const store = useSelector(state => state.companies)
    const dispatch = useDispatch()
    const [data, setData] = useState(null)
    const [status, setStatus] = useState(null)

    const checkIsValid = data => {
        return Object.values(data).map(field => (typeof field === 'object' ? field !== null : field.length > 0))
    }

    const statusOptions = [
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' }
    ]

    const {
        reset,
        control,
        setValue,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            // location: store.selectedCr?.location,
            // cr: store.selectedCr?.cr,
            // expiry: store.selectedCr?.expiry,
            // employeesNo: store.selectedCr?.employeesNo,
            // timings: store.selectedCr?.timings,
            // phone: store.selectedCr?.phone,
            // address: store.selectedCr?.address,
            // status: statusOptions[statusOptions.findIndex(option => option.value === store.selectedCr?.status)]
        }
    })

    const onSubmit = data => {
        setData(data)
        console.log(data)
        if (checkIsValid(data)) {
            dispatch(toggleEditModal())
            dispatch(updateCr({
                id: store.selectedCr.id,
                location: data.location,
                cr: data.cr,
                expiry: data.expiry,
                timings: data.timings,
                phone: data.phone,
                address: data.address,
                status: data.status
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

    const handleReset = () => {
        setValue("location", store.selectedCr.attributes.location)
        setValue("cr", store.selectedCr.attributes.cr)
        setValue("expiry", store.selectedCr.attributes.expiry)
        setValue("timings", store.selectedCr.attributes.timings)
        setValue("phone", store.selectedCr.attributes.phone)
        setValue("address", store.selectedCr.attributes.address)
        setValue("status", statusOptions[statusOptions.findIndex(option => option.value === store.selectedCr?.attributes.status)]['value'])
    }

    useEffect(() => {
        if (store.selectedCr) {
            setValue("location", store.selectedCr.attributes.location)
            setValue("cr", store.selectedCr.attributes.cr)
            setValue("expiry", store.selectedCr.attributes.expiry)
            setValue("timings", store.selectedCr.attributes.timings)
            setValue("phone", store.selectedCr.attributes.phone)
            setValue("address", store.selectedCr.attributes.address)
            setValue("status", statusOptions[statusOptions.findIndex(option => option.value === store.selectedCr?.attributes.status)]['value'])
        }

    }, [store.selectedCr])
    return (
        <Modal isOpen={store.editModal} toggle={() => dispatch(toggleEditModal())} className='modal-dialog-centered modal-lg'>
            <ModalHeader className='bg-transparent' toggle={() => dispatch(toggleEditModal())}></ModalHeader>
            <ModalBody className='px-sm-5 pt-50 pb-5'>
                <div className='text-center mb-2'>
                    <h1 className='mb-1'>Edit CR Information</h1>
                </div>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row className='gy-1 pt-75'>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='location'>
                                Location
                            </Label>
                            <Controller
                                control={control}
                                id='location'
                                name='location'
                                render={({ field }) => (
                                    <Input id='location' placeholder='Branch Area' invalid={errors.location && true} defaultValue={store.selectedCr?.attributes.location} onChange={value => setValue('location', value.target.value)} />
                                )}
                            />
                        </Col>
                        <Col md={6} xs={12}>
                            <Label className='form-label' for='cr'>
                                CR No
                            </Label>
                            <Controller
                                control={control}
                                id='cr'
                                name='cr'
                                render={({ field }) => (
                                    <Input id='cr' placeholder='Enter CR Number' invalid={errors.cr && true} defaultValue={store.selectedCr?.attributes.cr} onChange={value => setValue('cr', value.target.value)} />
                                )}
                            />
                        </Col>
                        <Col xs={12}>
                            <Label className='form-label' for='expiry'>
                                Expiry Date
                            </Label>
                            <Controller
                                control={control}
                                id='expiry'
                                name='expiry'
                                render={({ field }) => (
                                    <Flatpickr 
                                    options={{ minDate: "today" }} 
                                    className={classnames('form-control', { 'is-invalid': data !== null && data.expiry?.length === 0 })} 
                                    id='expiry' 
                                    onChange={value => setValue('expiry', value[0].toISOString())} 
                                    defaultValue={store.selectedCr?.attributes.expiry} />
                                )}
                            />
                        </Col>

                        <Col md={6} xs={12}>
                            <Label className='form-label' for='timings'>
                                Branch Timing
                            </Label>
                            <Controller
                                control={control}
                                id='timings'
                                name='timings'
                                render={({ field }) => (
                                    <Input
                                        invalid={errors.timings && true}
                                        defaultValue={store.selectedCr?.attributes.timings}
                                        onChange={value => setValue('timings', value.target.value)}
                                    />
                                )}
                            />

                        </Col>

                        <Col md={6} xs={12}>
                            <Label className='form-label' for='phone'>
                                Phone
                            </Label>
                            <Controller
                                id='phone'
                                name='phone'
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        invalid={errors.phone && true}
                                        defaultValue={store.selectedCr?.attributes.phone}
                                        onChange={value => setValue('phone', value.target.value)}
                                    />
                                )}

                            />

                        </Col>

                        <Col xs={12}>
                            <Label className='form-label' for='address'>
                                Address
                            </Label>
                            <Controller
                                control={control}
                                name='address'
                                id='address'
                                render={({ field }) => (
                                    <Input
                                        type="textarea"
                                        invalid={errors.address && true}
                                        defaultValue={store.selectedCr?.attributes.address} 
                                        onChange={value => setValue('address', value.target.value)}
                                    />
                                )}
                            />

                        </Col>

                        <Col xs={12}>
                            <Label className='form-label' for='status'>
                                Status:
                            </Label>
                            <Controller
                                control={control}
                                name='status'
                                id='status'
                                render={({ field }) => (
                                    <Select
                                        id='status'
                                        isClearable={false}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={statusOptions}
                                        theme={selectThemeColors}
                                        defaultValue={statusOptions[statusOptions.findIndex(option => option.value === store.selectedCr?.attributes.status)]}
                                        onChange={value => setValue('status', value.value)}
                                        

                                    // defaultValue={statusOptions.filter(option => option.value === store.selectedCr.status)}
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