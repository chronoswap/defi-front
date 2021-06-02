import { MenuEntry, menuStatus } from '@onekswaps/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'http://3.143.210.104',
      },
      {
        label: 'Liquidity',
        href: 'http://3.143.210.104/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'FarmIcon',
    href: '/farms',
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
        href: 'https://github.com/oneThousandSwaps',
      },
      {
        label: 'Docs',
        href: 'https://docs.pancakeswap.finance',
        status: menuStatus.SOON,
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
