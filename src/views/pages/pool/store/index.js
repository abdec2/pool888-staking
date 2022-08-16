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

export const getRewards = createAsyncThunk('getRewards', async (params) => {
    const {provider, tokenAddress, name} = params
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, signer)
    const reward = await contract.getRewardsPerMinute(tokenAddress)
    const rewardObj = { name, reward}
    console.log(name, reward.toString())
    
    return rewardObj
})

export const approveUSDC = createAsyncThunk('approveUSDC', async (params, {dispatch, getState}) => {
    try {
        const { provider, tokenAddress } = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        await dispatch(getRewards({provider, tokenAddress, name: 'USDC'}))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveUSDT = createAsyncThunk('approveUSDT', async (params, {dispatch, getState}) => {
    try {
        const { provider, tokenAddress } = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        await dispatch(getRewards({provider, tokenAddress, name: 'USDT'}))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveWETH = createAsyncThunk('approveWETH', async (params, {dispatch, getState}) => {
    try {
        const { provider, tokenAddress } = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        await dispatch(getRewards({provider, tokenAddress, name: 'WETH'}))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const approveMATIC = createAsyncThunk('approveMATIC', async (params, {dispatch, getState}) => {
    try {
        const { provider, tokenAddress } = params
        const signer = provider.getSigner()
        const contract = new ethers.Contract(tokenAddress, tokenAbi, signer)
        const address = await signer.getAddress()
        const balance = await contract.balanceOf(address)
        const tx = await contract.approve(CONFIG.CONTRACT_ADDRESS, balance)
        await tx.wait()
        await dispatch(getRewards({provider, tokenAddress, name: 'WMATIC'}))
        return true
    } catch (e) {
        console.log(e)
        return false
    }
})

export const getStakeBalance = createAsyncThunk('getStakeBalance', async (params) => {
    const { provider } = params
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, signer)
    const address = await signer.getAddress()
    const stakeBalanceArr = poolData.map(async (item) => {
        const stake = await contract.stakeOf(address, item.tokenAddress)
        const stakeObj = { name: item.name, balance: stake}
        return stakeObj
    })

    const returnVal = Promise.all(stakeBalanceArr).then(values => values)
    return returnVal
})

export const harvest = createAsyncThunk('harvest', async (params, {dispatch, getState}) => {
    const {provider, tokenAddress, name} = params
    const signer = provider.getSigner()
    const contract = new ethers.Contract(CONFIG.CONTRACT_ADDRESS, abi, signer)
    const rewardtx = await contract.getRewards(tokenAddress)

    await dispatch(getPoolData())
    await dispatch(getRewards({provider, tokenAddress, name}))
})

export const poolSlice = createSlice({
    name: "pools",
    initialState: {
        pools: [],
        approve: {
            USDC: false,
            USDT: false,
            WETH: false,
            WMATIC: false
        },
        stakeBalance: {
            USDC: 0,
            USDT: 0,
            WETH: 0,
            WMATIC: 0
        }, 
        rewards: {
            USDC: 0,
            USDT: 0,
            WETH: 0,
            WMATIC: 0
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
                state.approve.WMATIC = action.payload
            })
            .addCase(getStakeBalance.fulfilled, (state, action) => {
                action.payload.map(item => {
                    state.stakeBalance[item.name] = item.balance
                })
                
            })
            .addCase(getRewards.fulfilled, (state, action) => {
                state.rewards[action.payload.name] = action.payload.reward
            })
    }
})

export default poolSlice.reducer