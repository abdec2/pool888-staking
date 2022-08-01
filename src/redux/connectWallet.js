// ** Redux Imports
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider"
import { ethers } from 'ethers'
import CONFIG from './../config/config.json'

const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        infuraId: process.env.REACT_APP_INFURA_ID
      }
    }
  }
  
export const connectWallet = createAsyncThunk('connect_Wallet', async () => {
    try {
        const web3modal = new Web3Modal({
          providerOptions
        })
        const instance = await web3modal.connect()
        const provider = new ethers.providers.Web3Provider(instance)
        const signer = provider.getSigner()
        const address = await signer.getAddress()
        const network = await provider.getNetwork()
        if (network.chainId !== CONFIG.NETWORK_ID) {
            return {
                account: null, 
                provider: null, 
                error: true, 
                errorMsg: `Contract is not deployed on current network. please choose ${CONFIG.NETWORK}`
            }
        } else {
            return {
                account: address, 
                provider, 
                error: false, 
                errorMsg: ''
            }
        }
      } catch (e) {
        console.log(e)
        return {
            account: null, 
            provider: null, 
            error: true, 
            errorMsg: `Something went Wrong`
        }
      }
})


export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    account: null, 
    provider: null, 
    error: false, 
    errorMsg: '', 
    loading: false
  },
  reducers: {
    disconnectWallet: state => {
        state.account = null
        state.provider = null
        state.error = false
        state.errorMsg = ''
    }
  },
  extraReducers: builder => {
    builder
        .addCase(connectWallet.fulfilled, (state, action) => {
            state.account = action.payload.account
            state.provider = action.payload.provider
            state.error = action.payload.error
            state.errorMsg = action.payload.errorMsg
        })
  }
})

export const { disconnectWallet } = walletSlice.actions

export default walletSlice.reducer
