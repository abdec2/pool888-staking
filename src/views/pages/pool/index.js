import { useEffect, useReducer, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { ethers } from 'ethers'
import UseFetchApr from '../../../hooks/useFetchApr'

import PoolCard from './poolCard'

import CONFIG from './../../../config/config.json'
import abi from './../../../config/abi.json'
import pooldata from './../../../config/pools.json'

const Pool = () => {
  const [rSelected, setRSelected] = useState(1)
  const [data, setData] = useState([])
  // const [fetchApr, setFetchApr] = useState(false)
  // const {data} = UseFetchApr(fetchApr)
  console.log(data)

  useEffect(() => {
    const provider = new ethers.providers.InfuraProvider('rinkeby', process.env.REACT_APP_INFURA_ID)
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, provider)

    const getTokenAPR = async () => {
      const arr = []
      pooldata.map(async (item, i) => {
        const apr = await contract.getApr(item.tokenAddress)
        arr.push({ ...item, APR: apr.toString() })
      })
      return arr
    }

    getTokenAPR().then(res => {
      setData(res)
    })
  }, [])

  return (
    <>
      <div className="p-4 mb-1">
        <h1 className="text-center text-uppercase">Stake Tokens To Earn 888</h1>
      </div>
      <div className='d-flex align-items-center justify-content-center'>
        <div className='form-switch form-check-primary d-flex align-items-center justify-content-center'>
          <Input type='switch' id='switch-primary' name='primary' />
          <span className='ms-1'>
            Staked only
          </span>
        </div>
        <div>
          <ButtonGroup className='ms-1'>
            <Button className='rounded-end rounded-pill' color='primary' onClick={() => setRSelected(1)} active={rSelected === 1}>
              Active
            </Button>
            <Button color='primary' className='rounded-start rounded-pill' onClick={() => setRSelected(2)} active={rSelected === 2}>
              Inactive
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <div className='py-3'>
        <Row>
          {data.map((item, i) => (
            <PoolCard key={i} pool={item} apr={item.APR} />
          ))}
        </Row>
      </div>
    </>
  )
}

export default Pool