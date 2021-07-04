import tokens from './tokens'
import { StakingConfig } from './types'

const stakings: StakingConfig[] = [
  {
    pid: 6,
    stakingToken: tokens.wbnb,
    rewardToken: tokens.cake,
  },
  {
    pid: 7,
    stakingToken: tokens.cake1,
    rewardToken: tokens.cake,
  },
  {
    pid: 8,
    stakingToken: tokens.busd,
    rewardToken: tokens.cake,
  },
  {
    pid: 9,
    stakingToken: tokens.dai,
    rewardToken: tokens.cake,
  },
  {
    pid: 10,
    stakingToken: tokens.btcb,
    rewardToken: tokens.cake,
  },
]

export default stakings
