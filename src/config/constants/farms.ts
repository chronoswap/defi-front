import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ThoP',
    lpAddresses: {
      97: '0xCAbEe20D5B0a9FA6d389a66F0eC9cA28160889fF',
      1337: '0x646A336CD183dc947D3AdbEfb19c3cF637720318',
      56: '0x2d0d4d9e1A0fC421046FAeDea887fDE6654561B1',
    },
    token: tokens.thop,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 12,
    lpSymbol: 'ThoP-BNB LP',
    lpAddresses: {
      97: '0xc84ef89803d15c929dd80e3c9624027bac5c47d3',
      56: '0x8c970c05cf1ff42dbee336566be46bf9a1fe9ee6',
    },
    token: tokens.thop,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xaf5e8aa68dd1b61376ac4f6fa4d06a5a4ab6cafd',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 13,
    lpSymbol: 'ThoP-BUSD LP',
    lpAddresses: {
      97: '0x919976e1233e61287f9ca6086a8220b31c0aa6af',
      56: '0x8550751afab9715e3553a3abb1383dd6e18f6d04',
    },
    token: tokens.thop,
    quoteToken: tokens.busd,
  },
  // {
  //   pid: 14,
  //   lpSymbol: 'ThoP-CAKE LP',
  //   lpAddresses: {
  //     97: '0x919976e1233e61287f9ca6086a8220b31c0aa6af',
  //     56: '',
  //   },
  //   token: tokens.thop,
  //   quoteToken: tokens.cake,
  // },
  // {
  //   pid: 15,
  //   lpSymbol: 'ThoP-ADA LP',
  //   lpAddresses: {
  //     97: '0x919976e1233e61287f9ca6086a8220b31c0aa6af',
  //     56: '',
  //   },
  //   token: tokens.thop,
  //   quoteToken: tokens.ada,
  // },
  {
    pid: 2,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0xb263d019550d10f058017f0a1019e8984c7b9804',
      56: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
  {
    pid: 3,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      97: '0xb263d019550d10f058017f0a1019e8984c7b9804',
      56: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
]

export default farms
