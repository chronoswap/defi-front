import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ThoP',
    lpAddresses: {
      97: '0x50E22d39c3a93Fbd9800f9ee226D589d24664955',
      1337: '0x646A336CD183dc947D3AdbEfb19c3cF637720318',
      56: '',
    },
    token: tokens.thop,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'ThoP-BNB LP',
    lpAddresses: {
      97: '0xbbe838cfc0a79caf780c9b70c5d41bbd1254a983',
      56: '',
    },
    token: tokens.thop,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xaf5e8aa68dd1b61376ac4f6fa4d06a5a4ab6cafd',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 4,
    lpSymbol: 'ThoP-ETH LP',
    lpAddresses: {
      97: '0xf2bdfcfc607c7eb7c4b448e4020a5d481055f72a',
      56: '',
    },
    token: tokens.thop,
    quoteToken: tokens.eth,
  },
  {
    pid: 5,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      97: '0xb263d019550d10f058017f0a1019e8984c7b9804',
      56: '',
    },
    token: tokens.dai,
    quoteToken: tokens.busd,
  },
]

export default farms
