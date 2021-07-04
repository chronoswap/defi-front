import { useEffect, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { kebabCase } from 'lodash'
import { Toast, toastTypes } from '@chronoswap-packages/uikit'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state'
import { getWeb3NoAccount } from 'utils/web3'
import useRefresh from 'hooks/useRefresh'
import { State, Farm, Staking, Pool, PriceState } from 'state/types'
import {
  fetchFarmsPublicDataAsync,
  fetchStakingsPublicDataAsync,
  fetchPoolsPublicDataAsync,
  fetchPoolsUserDataAsync,
  fetchThopVaultPublicData,
  fetchThopVaultUserData,
  fetchThopVaultFees,
  push as pushToast,
  remove as removeToast,
  clear as clearToast,
  setBlock,
} from './actions'
import { fetchPrices } from './prices'

export const useFetchPublicData = () => {
  const dispatch = useAppDispatch()
  const { slowRefresh } = useRefresh()
  useEffect(() => {
    dispatch(fetchFarmsPublicDataAsync())
    dispatch(fetchStakingsPublicDataAsync())
    dispatch(fetchPoolsPublicDataAsync())
  }, [dispatch, slowRefresh])

  useEffect(() => {
    const web3 = getWeb3NoAccount()
    const interval = setInterval(async () => {
      const blockNumber = await web3.eth.getBlockNumber()
      dispatch(setBlock(blockNumber))
    }, 6000)

    return () => clearInterval(interval)
  }, [dispatch])
}

// Farms

export const useFarms = (): Farm[] => {
  const farms = useSelector((state: State) => state.farms.data)
  return farms
}

export const useFarmFromPid = (pid): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.pid === pid))
  return farm
}

export const useFarmFromSymbol = (lpSymbol: string): Farm => {
  const farm = useSelector((state: State) => state.farms.data.find((f) => f.lpSymbol === lpSymbol))
  return farm
}

export const useFarmUser = (pid) => {
  const farm = useFarmFromPid(pid)

  return {
    allowance: farm.userData ? new BigNumber(farm.userData.allowance) : new BigNumber(0),
    tokenBalance: farm.userData ? new BigNumber(farm.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: farm.userData ? new BigNumber(farm.userData.stakedBalance) : new BigNumber(0),
    earnings: farm.userData ? new BigNumber(farm.userData.earnings) : new BigNumber(0),
  }
}

// Pools

export const usePools = (account): Pool[] => {
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (account) {
      dispatch(fetchPoolsUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const pools = useSelector((state: State) => state.pools.data)
  return pools
}

export const usePoolFromPid = (sousId): Pool => {
  const pool = useSelector((state: State) => state.pools.data.find((p) => p.sousId === sousId))
  return pool
}

export const useFetchThopVault = () => {
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchThopVaultPublicData())
  }, [dispatch, fastRefresh])

  useEffect(() => {
    dispatch(fetchThopVaultUserData({ account }))
  }, [dispatch, fastRefresh, account])

  useEffect(() => {
    dispatch(fetchThopVaultFees())
  }, [dispatch])
}

export const useThopVault = () => {
  const {
    totalShares: totalSharesAsString,
    pricePerFullShare: pricePerFullShareAsString,
    totalThopInVault: totalThopInVaultAsString,
    estimatedThopBountyReward: estimatedThopBountyRewardAsString,
    totalPendingThopHarvest: totalPendingThopHarvestAsString,
    fees: { performanceFee, callFee, withdrawalFee, withdrawalFeePeriod },
    userData: {
      isLoading,
      userShares: userSharesAsString,
      thopAtLastUserAction: thopAtLastUserActionAsString,
      lastDepositedTime,
      lastUserActionTime,
    },
  } = useSelector((state: State) => state.pools.thopVault)

  const estimatedThopBountyReward = useMemo(() => {
    return new BigNumber(estimatedThopBountyRewardAsString)
  }, [estimatedThopBountyRewardAsString])

  const totalPendingThopHarvest = useMemo(() => {
    return new BigNumber(totalPendingThopHarvestAsString)
  }, [totalPendingThopHarvestAsString])

  const totalShares = useMemo(() => {
    return new BigNumber(totalSharesAsString)
  }, [totalSharesAsString])

  const pricePerFullShare = useMemo(() => {
    return new BigNumber(pricePerFullShareAsString)
  }, [pricePerFullShareAsString])

  const totalThopInVault = useMemo(() => {
    return new BigNumber(totalThopInVaultAsString)
  }, [totalThopInVaultAsString])

  const userShares = useMemo(() => {
    return new BigNumber(userSharesAsString)
  }, [userSharesAsString])

  const thopAtLastUserAction = useMemo(() => {
    return new BigNumber(thopAtLastUserActionAsString)
  }, [thopAtLastUserActionAsString])

  return {
    totalShares,
    pricePerFullShare,
    totalThopInVault,
    estimatedThopBountyReward,
    totalPendingThopHarvest,
    fees: {
      performanceFee,
      callFee,
      withdrawalFee,
      withdrawalFeePeriod,
    },
    userData: {
      isLoading,
      userShares,
      thopAtLastUserAction,
      lastDepositedTime,
      lastUserActionTime,
    },
  }
}

// Staking
export const useStakings = (): Staking[] => {
  const stakings = useSelector((state: State) => state.stakings.data)
  return stakings
}

export const useStakingFromPid = (pid): Staking => {
  const staking = useSelector((state: State) => state.stakings.data.find((s) => s.pid === pid))
  return staking
}

export const useStakingFromSymbol = (stakingTokenSymbol: string): Staking => {
  const staking = useSelector((state: State) => state.stakings.data.find((s) => s.stakingToken.symbol === stakingTokenSymbol))
  return staking
}

export const useStakingUser = (pid) => {
  const staking = useStakingFromPid(pid)

  return {
    allowance: staking.userData ? new BigNumber(staking.userData.allowance) : new BigNumber(0),
    tokenBalance: staking.userData ? new BigNumber(staking.userData.tokenBalance) : new BigNumber(0),
    stakedBalance: staking.userData ? new BigNumber(staking.userData.stakedBalance) : new BigNumber(0),
    earnings: staking.userData ? new BigNumber(staking.userData.earnings) : new BigNumber(0),
  }
}

// Toasts
export const useToast = () => {
  const dispatch = useAppDispatch()
  const helpers = useMemo(() => {
    const push = (toast: Toast) => dispatch(pushToast(toast))

    return {
      toastError: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.DANGER, title, description })
      },
      toastInfo: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.INFO, title, description })
      },
      toastSuccess: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.SUCCESS, title, description })
      },
      toastWarning: (title: string, description?: string) => {
        return push({ id: kebabCase(title), type: toastTypes.WARNING, title, description })
      },
      push,
      remove: (id: string) => dispatch(removeToast(id)),
      clear: () => dispatch(clearToast()),
    }
  }, [dispatch])

  return helpers
}

// Prices
export const useFetchPriceList = () => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPrices())
  }, [dispatch, slowRefresh])
}

export const useGetApiPrices = () => {
  const prices: PriceState['data'] = useSelector((state: State) => state.prices.data)
  return prices
}

export const useGetApiPrice = (token: string) => {
  const prices = useGetApiPrices()
  if (!prices) {
    return null
  }
  return prices[token.toLowerCase()]
}

export const usePriceThopBusd = (): BigNumber => {
  const ZERO = new BigNumber(0)
  const thopBnbFarm = useFarmFromPid(2) // TODO definir las granjas que usaremos para el precio
  const bnbBusdFarm = useFarmFromPid(3)

  const bnbBusdPrice = bnbBusdFarm.tokenPriceVsQuote ? new BigNumber(1).div(bnbBusdFarm.tokenPriceVsQuote) : ZERO
  const thopBusdPrice = thopBnbFarm.tokenPriceVsQuote ? bnbBusdPrice.times(thopBnbFarm.tokenPriceVsQuote) : ZERO

  return thopBusdPrice
}

// Block
export const useBlock = () => {
  return useSelector((state: State) => state.block)
}

export const useInitialBlock = () => {
  return useSelector((state: State) => state.block.initialBlock)
}
