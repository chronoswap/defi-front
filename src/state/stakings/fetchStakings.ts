import BigNumber from 'bignumber.js'
import erc20 from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import multicall from 'utils/multicall'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import stakingsConfig from 'config/constants/stakings'

const fetchStakings = async () => {
  const data = await Promise.all(
    stakingsConfig.map(async (stakingConfig) => {
      const masterChefAddress = getMasterChefAddress()
      const calls = [
        // Balance of token in the LP contract
        {
          address: getAddress(stakingConfig.stakingToken.address),
          name: 'balanceOf',
          params: [masterChefAddress],
        },
        // Token decimals
        {
          address: getAddress(stakingConfig.stakingToken.address),
          name: 'decimals',
        },
      ]

      const [
        tokenBalanceLP,
        tokenDecimals,
      ] = await multicall(erc20, calls)

      const tokenAmount = new BigNumber(tokenBalanceLP).div(new BigNumber(10).pow(tokenDecimals))

      const [info, totalAllocPoint] = await multicall(masterchefABI, [
        {
          address: getMasterChefAddress(),
          name: 'poolInfo',
          params: [stakingConfig.pid],
        },
        {
          address: getMasterChefAddress(),
          name: 'totalAllocPoint',
        },
      ])

      const allocPoint = new BigNumber(info.allocPoint._hex)
      const depositFee = new BigNumber(info.depositFee)
      const poolWeight = allocPoint.div(new BigNumber(totalAllocPoint))

      return {
        ...stakingConfig,
        stakingTokenAmount: tokenAmount.toJSON(),
        depositFee: depositFee.toJSON(),
        poolWeight: poolWeight.toJSON(),
        multiplier: `${allocPoint.div(100).toString()}X`,
      }
    }),
  )
  return data
}

export default fetchStakings
