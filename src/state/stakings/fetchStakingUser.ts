import BigNumber from 'bignumber.js'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import stakingsConfig from 'config/constants/stakings'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'

export const fetchStakingUserAllowances = async (account: string) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = stakingsConfig.map((staking) => {
    const lpContractAddress = getAddress(staking.stakingToken.address)
    return { address: lpContractAddress, name: 'allowance', params: [account, masterChefAddress] }
  })
  const rawLpAllowances = await multicall(erc20ABI, calls)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {
    return new BigNumber(lpBalance).toJSON()
  })
  return parsedLpAllowances
}

export const fetchStakingUserTokenBalances = async (account: string) => {
  const calls = stakingsConfig.map((staking) => {
    const lpContractAddress = getAddress(staking.stakingToken.address)
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  return parsedTokenBalances
}

export const fetchStakingUserStakedBalances = async (account: string) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = stakingsConfig.map((staking) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [staking.pid, account],
    }
  })

  const rawStakedBalances = await multicall(masterchefABI, calls)
  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })
  return parsedStakedBalances
}

export const fetchStakingUserEarnings = async (account: string) => {
  const masterChefAddress = getMasterChefAddress()

  const calls = stakingsConfig.map((staking) => {
    return {
      address: masterChefAddress,
      name: 'pendingToken',
      params: [staking.pid, account],
    }
  })

  const rawEarnings = await multicall(masterchefABI, calls)
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })
  return parsedEarnings
}
