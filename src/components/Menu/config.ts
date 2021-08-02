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
        href: 'https://exchange.pancakeswap.finance',
      },
      {
        label: 'Chart',
        href: 'https://dex.guru/token/0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82-bsc',
      },
    ],
  },
  {
    label: 'CHRO',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.pancakeswap.finance',
      },
      {
        label: 'Chart',
        href: 'https://dex.guru/token/0xe9e7cea3dedca5984780bafc599bd69add087d56-bsc',
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
    label: 'Collectibles',
    icon: 'NftIcon',
    href: '/collectibles',
    status: menuStatus.SOON,
  },
  {
    label: 'Info (Pancake)',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://pancakeswap.info',
      },
      {
        label: 'Tokens',
        href: 'https://pancakeswap.info/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://pancakeswap.info/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://pancakeswap.info/accounts',
      },
    ],
  },
  {
    label: 'More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Contact',
        href: 'https://docs.pancakeswap.finance/contact-us',
        status: menuStatus.SOON,
      },
      {
        label: 'Voting (SOON?)',
        href: 'https://voting.pancakeswap.finance',
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
      {
        label: 'Blog',
        href: 'https://pancakeswap.medium.com',
        status: menuStatus.SOON,
      },
      {
        label: 'Merch',
        href: 'https://pancakeswap.creator-spring.com/',
        status: menuStatus.SOON,
      },
    ],
  },
]
export default config
