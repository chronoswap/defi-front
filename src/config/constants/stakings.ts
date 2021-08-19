import tokens from './tokens'
import { StakingConfig } from './types'

const stakings: StakingConfig[] = [
  {
    pid: 4,
    stakingToken: tokens.wbnb,
    rewardToken: tokens.thop,
  },
  {
    pid: 5,
    stakingToken: tokens.cake,
    rewardToken: tokens.thop,
  },
  {
    pid: 6,
    stakingToken: tokens.busd,
    rewardToken: tokens.thop,
  },
  {
    pid: 7,
    stakingToken: tokens.dai,
    rewardToken: tokens.thop,
  },
  {
    pid: 8,
    stakingToken: tokens.btcb,
    rewardToken: tokens.thop,
  },
  {
    pid: 9,
    stakingToken: tokens.ada,
    rewardToken: tokens.thop,
  },
  {
    pid: 10,
    stakingToken: tokens.eth,
    rewardToken: tokens.thop,
  },
  {
    pid: 11,
    stakingToken: tokens.iota,
    rewardToken: tokens.thop,
  },
]

export default stakings
