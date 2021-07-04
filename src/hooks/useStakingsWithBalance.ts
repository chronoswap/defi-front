import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import multicall from 'utils/multicall'
import { getMasterChefAddress } from 'utils/addressHelpers'
import masterChefABI from 'config/abi/masterchef.json'
import { stakingsConfig } from 'config/constants'
import { StakingConfig } from 'config/constants/types'
import useRefresh from './useRefresh'

export interface StakingWithBalance extends StakingConfig {
  balance: BigNumber
}

const useStakingsWithBalance = () => {
  const [stakingsWithBalances, setStakingsWithBalances] = useState<StakingWithBalance[]>([])
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()

  useEffect(() => {
    const fetchBalances = async () => {
      const calls = stakingsConfig.map((staking) => ({
        address: getMasterChefAddress(),
        name: 'pendingToken',
        params: [staking.pid, account],
      }))
      const rawResults = await multicall(masterChefABI, calls)

      const results = stakingsConfig.map((staking, index) => ({ ...staking, balance: new BigNumber(rawResults[index]) }))

      setStakingsWithBalances(results)
    }

    if (account) {
      fetchBalances()
    }
  }, [account, fastRefresh])

  return stakingsWithBalances
}

export default useStakingsWithBalance
