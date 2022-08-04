import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

import CONFIG from './../../../../config/config.json'
import abi from './../../../../config/abi.json'
import poolData from './../../../../config/pools.json'
import { array } from 'prop-types'

export const getPoolData = createAsyncThunk('getPoolData', async () => {
    const provider = new ethers.providers.InfuraProvider('rinkeby', process.env.REACT_APP_INFURA_ID)
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, provider)

    const poolArr = poolData.map(async (item, i) => {
        const apr = await contract.getApr(item.tokenAddress)
        const pool = { ...item, APR: apr.toString() }
        return pool
    })
    const returnVal = Promise.all(poolArr).then(values => values)
    return returnVal
})

export const poolSlice = createSlice({
    name: "pools",
    initialState: {
        pools: []
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPoolData.fulfilled, (state, action) => {
                state.pools = action.payload
            })
    }
})

export default poolSlice.reducer