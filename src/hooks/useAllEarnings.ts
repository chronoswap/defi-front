import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { farmsConfig, stakingsConfig } from 'config/constants'
import useRefresh from './useRefresh'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchAllBalances = async () => {
      const farmCalls = farmsConfig.map((farm) => ({
        address: getMasterChefAddress(),
        name: 'pendingToken',
        params: [farm.pid, account],
      }))
      const stakingCalls = stakingsConfig.map((staking) => ({
        address: getMasterChefAddress(),
        name: 'pendingToken',
        params: [staking.pid, account],
      }))
      const res = await multicall(masterChefABI, [...farmCalls, ...stakingCalls])

      setBalance(res)
    }

    if (account) {
      fetchAllBalances()
    }
  }, [account, fastRefresh])

  return balances
}

export default useAllEarnings
