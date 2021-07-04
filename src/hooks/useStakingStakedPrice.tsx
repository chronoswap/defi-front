import { useEffect, useState, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useStakingFromPid, useGetApiPrices } from 'state/hooks'
import { getAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const useStakingStakedPrice = (pid) => {
  const [stakingStakedPrice, setStakingStakedPrice] = useState({stakingStakedPrice: 0.0, stakingTokenPrice: 0.0})
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const staking = useStakingFromPid(pid)
  const prices = useGetApiPrices()

  const _stakingTokenPrice = useMemo(() =>
    prices ? new BigNumber(prices[getAddress(staking.stakingToken.address, true)]):new BigNumber(0),  // TODO ojo con el true
    [prices, staking.stakingToken.address]
  )

  useEffect(() => {
    const fetchStaked = () => {
      const userStakedBalance = new BigNumber(staking.userData?staking.userData.stakedBalance:0).div(10**staking.stakingToken.decimals)
      const stakedBalancePrice = userStakedBalance.times(_stakingTokenPrice)
      setStakingStakedPrice({stakingStakedPrice: stakedBalancePrice.toNumber(), stakingTokenPrice: _stakingTokenPrice.toNumber()})
    }

    if (account) {
      fetchStaked()
    }
  }, [account, staking.stakingToken.decimals, staking.userData, _stakingTokenPrice, fastRefresh])

  return stakingStakedPrice
}

export default useStakingStakedPrice
