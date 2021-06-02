import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ONEK',
    lpAddresses: {
      97: '0x9C21123D94b93361a29B2C2EFB3d5CD8B17e0A9e',
      1337: '0x646A336CD183dc947D3AdbEfb19c3cF637720318',
      56: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    token: tokens.syrup,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 8,
    lpSymbol: 'ONEK-BNB LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0xd4F918e917C5fFF3366a8A9406c4D51358e472AD',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.bunny,
  },
  {
    pid: 9,
    lpSymbol: 'BNB-BUSD LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0xF087E0c81B9b34c1e154A651B8C11d8Ef4e1e715',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.bunny,
  },
  {
    pid: 1,
    lpSymbol: 'ONEK-BUNNY LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0x7c2bf1CD417FD020fa47a777c601459261Bf612d',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.bunny,
  },
  {
    pid: 2,
    lpSymbol: 'ONEK-DFD LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0x75803d67ce43d06C6B8b765ef1a2064baC4841A6',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.dfd,
  },
  {
    pid: 3,
    lpSymbol: 'ONEK-ALPACA LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0xf3b49459Eb3a2b22c930802B57780Ef275Ea1595',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.alpaca,
  },
  {
    pid: 4,
    lpSymbol: 'ONEK-XED LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0x8f19eDE19cEB2a6d4f124242C00CaF06e6006F87',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.xed,
  },
  {
    pid: 5,
    lpSymbol: 'ONEK-LTO LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0x1A82B66F9860C92B6Cb68d5189F0DCF7c03f24fd',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.lto,
  },
  {
    pid: 6,
    lpSymbol: 'ONEK-TKN6 LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0x58d198f113524d93430622baDdD2390ebAd114E3',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.tkn6,
  },
  {
    pid: 7,
    lpSymbol: 'ONEK-TKN7 LP',
    lpAddresses: {
      97: '0xe70b7523f4bffa1f2e88d2ba709afd026030f412',
      1337: '0xe8355B5A04D3829FF361295b671Ab9Dde4a3d530',
      56: '0xA527a61703D82139F8a06Bc30097cC9CAA2df5A6',
    },
    token: tokens.cake,
    quoteToken: tokens.tkn7,
  },
]

export default farms
