import { useWeb3React } from '@web3-react/core'
import { useEffect, useReducer, useState } from 'react'
import { useChronostoneContract } from './useContract'

const chronostoneContract = useChronostoneContract()

export type NftMap = {
  [key: number]: {
    tokenUri: string
    tokenIds: number[]
  }
}

type Action = { type: 'set_nfts'; data: NftMap } | { type: 'reset' } | { type: 'refresh'; timestamp: number }

type State = {
  isLoading: boolean
  nfts: NftMap
  lastUpdated: number
}

const initialState: State = {
  isLoading: true,
  nfts: {},
  lastUpdated: Date.now(),
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'refresh':
      return {
        ...initialState,
        lastUpdated: action.timestamp,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetWalletNftIds = (account) => {
  const [state, setState] = useState([])
  useEffect(() => {
    if (account) {
      chronostoneContract.methods.getBalancesByAddress(account).call().then(response => {setState(response)})
    }
  }, [account])
  return state
}

const useGetNftUri = () => {
  const [state, setState] = useState("")
  useEffect(() => {
    chronostoneContract.methods.uri(1).call().then(response => {setState(response)})
  }, [])
  return state
}

const useGetWalletNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()
  const { lastUpdated } = state
  const walletBalance = useGetWalletNftIds(account)
  const nftUri = "http://3.22.97.218:5000/get-card/{id}"  // TODO useGetNftUri()
  console.log(nftUri)

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        if (walletBalance.length > 0) {
          const getNFTInfo = async (nftId) => {
            try {
              let nftMeta = {}
              fetch(nftUri.substring(0, nftUri.length - 4) + nftId.toString()).then(res => res.json()).then(response => {nftMeta = response})
              return nftMeta
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < walletBalance.length; i++) {
            tokenIdPromises.push(getNFTInfo(walletBalance[i]))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)
          console.log(tokenIdsOwnedByWallet)
          const nfts: NftMap = tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [bunnyId, tokenId, tokenUri] = association

            return {
              ...accum,
              [bunnyId]: {
                tokenUri,
                tokenIds: accum[bunnyId] ? [...accum[bunnyId].tokenIds, tokenId] : [tokenId],
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: nfts })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, lastUpdated, dispatch, walletBalance, nftUri])

  const refresh = () => dispatch({ type: 'refresh', timestamp: Date.now() })

  return { ...state, refresh }
}

export default useGetWalletNfts
