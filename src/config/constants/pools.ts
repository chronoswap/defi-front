import tokens from './tokens'
import { PoolConfig, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    stakingToken: tokens.thop,
    earningToken: tokens.thop,
    contractAddress: {
      97: '0x66B25aD35ac9CE7487eEDec14A621c95e6D2eE8D',
      1337: '0x8f6DC524242A26399d81CAFF101db95C9d0232D8',
      56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
    },
    poolCategory: PoolCategory.CORE,
    isAutoVault: false,
    harvest: true,
    tokenPerBlock: '10',
    sortOrder: 1,
    isFinished: false,
  },
  // {
  //   sousId: 1,
  //   stakingToken: tokens.thop,
  //   earningToken: tokens.thop,
  //   contractAddress: {
  //     97: '0x66B25aD35ac9CE7487eEDec14A621c95e6D2eE8D',
  //     1337: '0x8f6DC524242A26399d81CAFF101db95C9d0232D8',
  //     56: '0x73feaa1eE314F8c655E354234017bE2193C9E24E',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   isAutoVault: true,
  //   harvest: true,
  //   tokenPerBlock: '1',
  //   sortOrder: 1,
  //   isFinished: false,
  // },
]

export default pools
