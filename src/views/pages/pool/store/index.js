import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

import CONFIG from './../../../../config/config.json'
import abi from './../../../../config/abi.json'
import tokenAbi from './../../../../config/tokenAbi.json'
import poolData from './../../../../config/pools.json'

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

export const approveUSDC = createAsyncThunk('approveUSDC', async (params) => {
    try {
        const {provider, tokenAddress} = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveUSDT = createAsyncThunk('approveUSDT', async (params) => {
    try {
        const {provider, tokenAddress} = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveWETH = createAsyncThunk('approveWETH', async (params) => {
    try {
        const {provider, tokenAddress} = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveMATIC = createAsyncThunk('approveMATIC', async (params) => {
    try {
        const {provider, tokenAddress} = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const poolSlice = createSlice({
    name: "pools",
    initialState: {
        pools: [], 
        approve: {
            USDC: false,
            USDT: false, 
            WETH: false,
            MATIC: false
        }
    },
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getPoolData.fulfilled, (state, action) => {
                state.pools = action.payload
            })
            .addCase(approveUSDC.fulfilled, (state, action) => {
                state.approve.USDC = action.payload
            })
            .addCase(approveUSDT.fulfilled, (state, action) => {
                state.approve.USDT = action.payload
            })
            .addCase(approveWETH.fulfilled, (state, action) => {
                state.approve.WETH = action.payload
            })
            .addCase(approveMATIC.fulfilled, (state, action) => {
                state.approve.MATIC = action.payload
            })
    }
})

export default poolSlice.reducer