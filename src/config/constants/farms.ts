import tokens from './tokens'
import { FarmConfig } from './types'

const farms: FarmConfig[] = [
  {
    pid: 0,
    lpSymbol: 'ThoP',
    lpAddresses: {
      97: '0xB47622c5562a6e55D69538d5ba3CE1ecaFDCC6F3',
      1337: '0x646A336CD183dc947D3AdbEfb19c3cF637720318',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'ThoP-BNB LP',
    lpAddresses: {
      97: '0xb667f7c1102dcfbbcec342497fa7da8aee52ac4a',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      97: '0xaf5e8aa68dd1b61376ac4f6fa4d06a5a4ab6cafd',
      56: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16',
    },
    token: tokens.busd,
    quoteToken: tokens.wbnb,
  },
  {
    pid: 3,
    lpSymbol: 'ThoP-ETH LP',
    lpAddresses: {
      97: '0x8349336c125a8bb73d6c1f41e22384bcfba8557b',
      56: '',
    },
    token: tokens.cake,
    quoteToken: tokens.eth,
  },
]

export default farms
