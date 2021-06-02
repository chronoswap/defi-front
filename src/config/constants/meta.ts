import { PageMeta } from './types'

export const DEFAULT_META: PageMeta = {
  title: 'OneThousandSwaps',
  description:
    'The AMM on BSC by user count! Earn ThoP through yield farming or in the Chronostone game, then stake it in our Pools to earn more tokens! A platform you can trust.',
  image: 'https://pancakeswap.finance/images/easter-battle.png',
}

export const customMeta: { [key: string]: PageMeta } = {
  '/competition': {
    title: 'PancakeSwap Easter Battle',
    description: 'Register now for the PancakeSwap Easter battle!',
    image: 'https://pancakeswap.finance/images/easter-battle.png',
  },
}
