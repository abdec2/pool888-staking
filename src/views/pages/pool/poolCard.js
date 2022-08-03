import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import { Plus, Minus } from 'react-feather'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { connectWallet } from '../../../redux/connectWallet'

const PoolCard = ({ pool, apr }) => {
    const [open, setOpen] = useState('0')
    const store = useSelector(state => state.ConnectWallet)
    const dispatch = useDispatch()

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }

    useEffect(() => {
        console.log(apr)
    }, [apr])

    return (
        <>
            <Col md='6' lg="4">
                <Card className='mb-3' style={{ boxShadow: "0 0 10px 2px rgb(115 103 240 / 70%)" }}>
                    <CardBody>
                        <CardTitle tag='div'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <img style={{width: '20%'}} src={pool.logo} alt="" />
                                <h3 className='m-0'>{pool.symbol}</h3>
                            </div>
                        </CardTitle>
                        <CardText tag="div">
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bolder'>APR:</p>
                                <p className='fw-bolder'>{pool.APR} %</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bolder'>Earn:</p>
                                <p className='fw-bolder'>888</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bolder'>Deposit Fee:</p>
                                <p className='fw-bolder'>{pool.depositFee}%</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <p className='fw-bolder'>Harvest Lockup:</p>
                                <p className='fw-bolder'>{pool.harvestLockup} Hours</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h5 className='fw-bolder'>888 EARNED</h5>
                            </div>

                            <div className='d-flex align-items-center justify-content-between mb-1'>
                                <h1 className='fw-bolder mb-0'>0.00</h1>
                                <Button className='rounded-pill' color='primary' outline>
                                    Harvest
                                </Button>
                            </div>

                            {store.account && (
                                <>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <h5 className='fw-bolder'>{pool.symbol} STAKED</h5>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-between mb-1'>
                                        <h1 className='fw-bolder mb-0'>0.00</h1>
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <Button className='rounded-pill me-1' color='primary' outline>
                                                <Minus size={15} />
                                            </Button>
                                            <Button className='rounded-pill' color='primary' outline>
                                                <Plus size={15} />
                                            </Button>
                                        </div>
                                    </div>
                                    <div className='d-flex align-items-center justify-content-center mt-2'>
                                        <Input type='text' />
                                        <Button color='primary' className='rounded-pill ms-1'>Submit</Button>
                                    </div>
                                    <div className='mt-2 d-flex align-items-center justify-content-center'>
                                        <Button className='rounded-pill' color='primary'>Approve Contract</Button>
                                    </div>
                                </>
                            )}
                            {!store.account && (
                                <div className='mt-2 d-flex align-items-center justify-content-center'>
                                    <Button className='rounded-pill' color='primary' onClick={() => dispatch(connectWallet())}>Unlock Wallet</Button>
                                </div>
                            )}
                        </CardText>
                    </CardBody>
                    <Accordion open={open} toggle={toggle}>
                        <AccordionItem>
                            <AccordionHeader targetId='1'>Detail</AccordionHeader>
                            <AccordionBody accordionId='1'>
                                <div className='d-flex flex-column'>
                                    <a href="#">View on Polygon</a>
                                    <a className='my-1' href="#">Get {pool.symbol} on QuickSwap</a>
                                    <a href="#">Add {pool.symbol} to Metamask</a>
                                </div>
                            </AccordionBody>
                        </AccordionItem>
                    </Accordion>
                </Card>
            </Col>
        </>
    )
}

export default PoolCard