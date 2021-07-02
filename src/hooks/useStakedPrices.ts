import { useEffect, useCallback } from 'react'
import { useAppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useFarms, useGetApiPrices, usePools, useBlock, usePriceCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { Farm, Pool } from 'state/types'

import { getAddress } from 'utils/addressHelpers'

export interface FarmWithStakedValue extends Farm {
  liquidity?: BigNumber
  lpPrice?: BigNumber
}

export interface PoolWithStakedValue extends Pool {
  stakingTokenPrice?: BigNumber
}

const useStakedPrices = () => {
  const farmsLP = useFarms()
  const { account } = useWeb3React()
  const prices = useGetApiPrices()
  const priceCakeBusd = usePriceCakeBusd()
  const pools = usePools(account)
  const { currentBlock } = useBlock()
  // Farms
  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])
  const activeFarms = farmsLP.filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        if (!farm.lpTotalInQuoteToken || !prices) {
          return farm
        }
        const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address, true).toLowerCase()]  // TODO true en el getAddress
        const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const lpSupply = new BigNumber(farm.lpStaked).div(10**farm.token.decimals)
        const farmLpPrice = totalLiquidity.div(lpSupply)

        return { ...farm, liquidity: totalLiquidity, lpPrice: farmLpPrice }
      })
      return farmsToDisplayWithAPY
    },
    [prices],
  )
  const farmsStaked = farmsList(stakedOnlyFarms)
  // Pools
  const activePools = pools.filter((pool) => !pool.isFinished && currentBlock < pool.endBlock)
  const stakedOnlyPools = pools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance).isGreaterThan(0))
  const poolsList = useCallback(
    (poolsToDisplay: Pool[]): PoolWithStakedValue[] => {
      const poolsToDisplayWithAPY: PoolWithStakedValue[] = poolsToDisplay.map((pool) => {
        if (!pool.userData.stakedBalance || !prices) {
          return pool
        }
        let stakingTokenPriceUsd = priceCakeBusd
        if (pool.stakingToken.symbol !== "ThoP") {
          stakingTokenPriceUsd = new BigNumber(prices[getAddress(pool.stakingToken.address, true).toLowerCase()])  // TODO true en el getAddress
        }
        return { ...pool, stakingTokenPrice: stakingTokenPriceUsd }
      })
      return poolsToDisplayWithAPY
    },
    [prices, priceCakeBusd],
  )
  const poolsStaked = poolsList(stakedOnlyPools)




  return {farms: farmsStaked, pools: poolsStaked}
}

export default useStakedPrices
