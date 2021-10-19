import { MenuEntry, menuStatus } from '@chronoswap-packages/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'ThoP',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://pancakeswap.finance/swap?outputCurrency=0x2d0d4d9e1a0fc421046faedea887fde6654561b1',
      },
      {
        label: 'Chart',
        href: 'https://dex.guru/token/0x2d0d4d9e1A0fC421046FAeDea887fDE6654561B1-bsc',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Staking',
    icon: 'StakeIcon',
    href: '/staking',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Chronostone',
    icon: 'NftIcon',
    href: '/#',
    status: menuStatus.SOON,
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Tokens',
        href: 'https://pancakeswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://pancakeswap.info/pools',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'https://info.chronoswap.finance',
        status: menuStatus.SOON,
      },
      {
        label: 'Github',
        href: 'https://github.com/chronoswap',
      },
      {
        label: 'Docs',
        href: 'https://info.chronoswap.finance',
      },
    ],
  },
]
export default config
