import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'

import { Plus, Minus } from 'react-feather'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { approveMATIC, approveUSDC, approveUSDT, approveWETH, getStakeBalance, getRewards } from './store'

import { connectWallet } from '../../../redux/connectWallet'
import { ethers } from 'ethers'

import CONFIG from './../../../config/config.json'
import tokenAbi from './../../../config/tokenAbi.json'
import abi from './../../../config/abi.json'

const PoolCard = ({ pool, apr }) => {
    const [open, setOpen] = useState('0')
    const withdraw = useRef()
    const stake = useRef()
    const withdrawAmount = useRef()
    const stakeAmount = useRef()

    const store = useSelector(state => state.ConnectWallet)
    const poolStore = useSelector(state => state.PoolData)
    const dispatch = useDispatch()

    console.log(poolStore.rewards)

    const stakedBalance = (poolStore.stakeBalance[pool.name] === 0) ? 0.00 : ethers.utils.formatUnits(poolStore.stakeBalance[pool.name], pool.decimal)

    const reward = (poolStore.rewards[pool.name] === 0) ? 0.00 : ethers.utils.formatUnits(poolStore.rewards[pool.name], 8)

    const toggle = id => {
        open === id ? setOpen() : setOpen(id)
    }

    const showWithDraw = () => {
        const withdrawDiv = withdraw.current
        const stakeDiv = stake.current

        if (withdrawDiv.classList.contains('d-none')) {
            withdrawDiv.classList.remove('d-none')
            stakeDiv.classList.add('d-none')
        } else {
            withdrawDiv.classList.add('d-none')
        }
        
    }

    const showStake = () => {
        const withdrawDiv = withdraw.current
        const stakeDiv = stake.current

        if (stakeDiv.classList.contains('d-none')) {
            stakeDiv.classList.remove('d-none')
            withdrawDiv.classList.add('d-none')
        } else {
            stakeDiv.classList.add('d-none')
        }
        
    }

    const handleApprove = async () => {
        const provider = store.provider
        if (pool.name.toUpperCase() === "USDC") {
            console.log(pool.name)
            dispatch(approveUSDC({ provider, tokenAddress: pool.tokenAddress }))
        } else if (pool.name.toUpperCase() === "USDT") {
            console.log(pool.name)
            dispatch(approveUSDT({ provider, tokenAddress: pool.tokenAddress }))
        } else if (pool.name.toUpperCase() === "WETH") {
            console.log(pool.name)
            dispatch(approveWETH({ provider, tokenAddress: pool.tokenAddress }))
        } else {
            console.log(pool.name)
            dispatch(approveMATIC({ provider, tokenAddress: pool.tokenAddress }))
        }
    }

    const handleWithdraw = async () => {
        const amount = withdrawAmount.current.value
        const expression = /^[1-9]\d*(\.\d+)?$/
        if (amount === '') {
            return
        }
        const amountTest = expression.test(amount)
        if (!amountTest) {
            return
        }
        const weiAmount = ethers.utils.parseUnits(amount, pool.decimal)
        const provider = store.provider
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, signer)
        const estimateGas = await contract.estimateGas.unStake(weiAmount, pool.tokenAddress)
        const tx = {
            gasLimit: estimateGas.toString()
        }
        const withdrawTx = await contract.unStake(weiAmount, pool.tokenAddress, tx)
        await withdrawTx.wait()
        console.log(withdrawTx)
        dispatch(getStakeBalance({provider: store.provider}))
    }

    const handleStake = async () => {
        const amount = stakeAmount.current.value
        const expression = /^[1-9]\d*(\.\d+)?$/
        if (amount === '') {
            return
        }
        const amountTest = expression.test(amount)
        if (!amountTest) {
            return
        }
        const weiAmount = ethers.utils.parseUnits(amount, pool.decimal)
        const provider = store.provider
        const signer = await provider.getSigner()
        const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, signer)
        const estimateGas = await contract.estimateGas.createStake(weiAmount, pool.tokenAddress)
        const tx = {
            gasLimit: estimateGas.toString()
        }
        const stakeTx = await contract.createStake(weiAmount, pool.tokenAddress, tx)
        await stakeTx.wait()
        console.log(stakeTx)
        dispatch(getStakeBalance({provider: store.provider}))
    }

    useEffect(() => {
        if (store.account) {
            setInterval(() => {
                dispatch(getRewards({provider: store.provider, tokenAddress: pool.tokenAddress, name: pool.name}))
            }, 60000)   
        }
    }, [store.account])

    return (
        <>
            <Col md='6' lg="4">
                <Card className='mb-3' style={{ boxShadow: "0 0 10px 2px rgb(115 103 240 / 70%)" }}>
                    <CardBody>
                        <CardTitle tag='div'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <img style={{ width: '20%' }} src={pool.logo} alt="" />
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
                                <h3 className='fw-bolder mb-0'>{parseFloat(reward).toFixed(8)}</h3>
                                <Button className='rounded-pill' color='primary' outline>
                                    Harvest
                                </Button>
                            </div>

                            {store.account && (
                                <>

                                    {   // remove ! from !poolStore.approve[pool.name]
                                        poolStore.approve[pool.name] && (
                                            <>
                                                <div className='d-flex align-items-center justify-content-between'>
                                                    <h5 className='fw-bolder'>{pool.symbol} STAKED</h5>
                                                </div>
                                                <div className='d-flex align-items-center justify-content-between mb-1'>
                                                    <h3 className='fw-bolder mb-0'>{stakedBalance}</h3>
                                                    <div className='d-flex align-items-center justify-content-center'>
                                                        <Button className='rounded-pill me-1' color='primary' outline onClick={showWithDraw}>
                                                            <Minus size={15} />
                                                        </Button>
                                                        <Button className='rounded-pill' color='primary' outline onClick={showStake}>
                                                            <Plus size={15} />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }

                                    <div ref={withdraw} className='withdraw d-flex align-items-center justify-content-center mt-2 d-none'>
                                        <Input innerRef={withdrawAmount} type='text' placeholder='Withdraw Amount' />
                                        <Button color='primary' className='rounded-pill ms-1' onClick={handleWithdraw}>Submit</Button>
                                    </div>
                                    <div ref={stake} className='stake d-flex align-items-center justify-content-center mt-2 d-none'>
                                        <Input innerRef={stakeAmount} type='text' placeholder='Stake Amount'/>
                                        <Button color='primary' className='rounded-pill ms-1' onClick={handleStake}>Submit</Button>
                                    </div>
                                    {!poolStore.approve[pool.name] && (
                                        <div className='mt-2 d-flex align-items-center justify-content-center'>
                                            <Button className='rounded-pill' color='primary' onClick={handleApprove}>Approve Contract</Button>
                                        </div>
                                    )}
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