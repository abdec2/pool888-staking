import { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import CONFIG from './../config/config.json'
import abi from './../config/abi.json'
import pools from './../config/pools.json'


const UseFetchApr = (fetchApr) => {
    const [data, setData] = useState([])

    const provider = new ethers.providers.InfuraProvider('rinkeby', process.env.REACT_APP_INFURA_ID)
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, provider)

    const getTokenAPR = async () => {
        const arr = []
        pools.map(async (item, i) => {
            const apr = await contract.getApr(item.tokenAddress)
            arr.push({...item, APR: apr.toString()})
        })
        return arr
    }

    useEffect(() => {
        getTokenAPR().then(res => {
            setData(res)
        })
        
    }, [fetchApr])

    return {data}
}

export default UseFetchApr