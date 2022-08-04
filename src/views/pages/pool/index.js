import { useEffect, useReducer, useState } from 'react'
import { Button, ButtonGroup, Card, CardBody, CardText, CardTitle, Col, Input, Row, Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap'
import { getPoolData } from './store'
import PoolCard from './poolCard'
import { useDispatch, useSelector } from 'react-redux'

const Pool = () => {
  const [rSelected, setRSelected] = useState(1)
  const store = useSelector(store => store.PoolData)
  const dispatch = useDispatch()
  const data = store.pools

  useEffect(() => {
    dispatch(getPoolData())
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