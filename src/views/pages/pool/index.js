import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { ethers } from 'ethers'


import USDC from './../../../icons/usdc.png'
import ETH from './../../../icons/eth.png'
import USDT from './../../../icons/usdt.png'
import MATIC from './../../../icons/matic.png'
import PoolCard from './poolCard'

import CONFIG from './../../../config/config.json'
import abi from './../../../config/abi.json'

const Pool = () => {
  const [rSelected, setRSelected] = useState(1)

  const provider = new ethers.providers.InfuraProvider('rinkeby', process.env.REACT_APP_INFURA_ID)
  const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, provider)
  
  
  const pools = [
    {
      tokenAddress: "0x0f762a37718d4BeaD84f4ae66e00A56885Fe5507",
      name: 'USDC', 
      symbol: "USDC", 
      depositFee: "5",
      harvestLockup: "8",
      logo: USDC, 
      APR: 0
    },
    {
      tokenAddress: "0xECff50c25543af32BADeaB542D0805b8B911cD4d",
      name: 'USDT', 
      symbol: "USDT", 
      depositFee: "5",
      harvestLockup: "8",
      logo: USDT, 
      APR: 0
    },
    {
      tokenAddress: "0x9ff305836Feb02996d3baC69DB1394dAbd71481F",
      name: 'WETH', 
      symbol: "WETH", 
      depositFee: "5",
      harvestLockup: "8",
      logo: ETH, 
      APR: 0
    },
    {
      tokenAddress: "0xC1526b5D8E74BC9583562Bc3AF3631c284C8E41d",
      name: 'WMATIC', 
      symbol: "WMATIC", 
      depositFee: "5",
      harvestLockup: "8",
      logo: MATIC, 
      APR: 0
    }
  ]

  const getTokenAPR = async (tokenAddress) => {
    const apr = await contract.getApr(tokenAddress)
    return apr
  }

  useEffect(() => {
    pools.map((item, i) => {
      const apr = getTokenAPR(item.tokenAddress).then(result => {
        console.log(result.toString())
        pools[i].APR = result.toString()
      })
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
          {pools.map((item, i) => (
            <PoolCard key={i} pool={item} apr={item.APR} />
          ))}
        </Row>
      </div>
    </>
  )
}

export default Pool