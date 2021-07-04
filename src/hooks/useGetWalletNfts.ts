import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { Nfts } from 'state/types'
import { useChronostoneContract } from './useContract'

const useGetWalletNftIds = (account) => {
  const [state, setState] = useState([])
  const chronostoneContract = useChronostoneContract()
  useEffect(() => {
    if (account) {
      chronostoneContract.methods.getBalancesByAddress(account).call().then(response => {setState(response)})
    }
  }, [account, chronostoneContract])
  return state
}

const useGetNftUri = () => {
  const [state, setState] = useState("")
  const chronostoneContract = useChronostoneContract()
  useEffect(() => {
    chronostoneContract.methods.uri(1).call().then(response => {setState(response)})
  }, [chronostoneContract])
  return state
}

const useGetWalletNfts = () => {
  let nftsInit: Nfts[]
  const [state, setState] = useState(nftsInit)
  const { account } = useWeb3React()
  const walletBalance = useGetWalletNftIds(account)
  const nftUri = useGetNftUri()
  const batch = "batch/"

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        if (walletBalance.length > 0) {
           await fetch(nftUri.substring(0, nftUri.length - 4) + batch + walletBalance.join(","))
            .then(res => res.json())
            .then(response => {
              setState(response)
            })
        } else {
          // Hola
        }
      } catch (error) {
        // Hola
      }
    }
    if (account) {
      fetchNfts()
    }
  }, [account, walletBalance, nftUri])
  return state
}

export default useGetWalletNfts
