import BigNumber from 'bignumber.js'
import { Pool } from 'state/types'
import { apyModalRoi, tokenEarnedPerThousandDollarsCompounding } from 'utils/compoundApyHelpers'
import { getAddress } from 'utils/addressHelpers'
import { getPoolApy } from 'utils/apy'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToThop = (
  shares: BigNumber,
  thopPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(thopPerFullShare, decimals)
  const amountInThop = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const thopAsNumberBalance = getBalanceNumber(amountInThop, decimals)
  const thopAsBigNumber = getDecimalAmount(new BigNumber(thopAsNumberBalance), decimals)
  const thopAsDisplayBalance = getFullDisplayBalance(amountInThop, decimals, decimalsToRound)
  return { thopAsNumberBalance, thopAsBigNumber, thopAsDisplayBalance }
}

export const convertThopToShares = (
  thop: BigNumber,
  thopPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(thopPerFullShare, decimals)
  const amountInShares = new BigNumber(thop.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}

const AUTO_VAULT_COMPOUND_FREQUENCY = 288
const MANUAL_POOL_COMPOUND_FREQUENCY = 1

export const getAprData = (pool: Pool, performanceFee: number, prices: number[], priceThopBusd: BigNumber) => {
  const { isAutoVault, earningToken, stakingToken } = pool
  let earningTokenPrice
  if (prices) {
    earningTokenPrice = earningToken.symbol === 'ThoP'?priceThopBusd:new BigNumber(prices[getAddress(earningToken.address, true)]) // TODO ojo el true
  } else {
    earningTokenPrice = new BigNumber(0)
  }
  let stakingTokenPrice
  if (prices) {
    stakingTokenPrice = stakingToken.symbol === 'ThoP'?priceThopBusd:new BigNumber(prices[getAddress(stakingToken.address, true)])
  } else {
    stakingTokenPrice = new BigNumber(0)
  }
  const apr = getPoolApy(
    stakingTokenPrice,
    earningTokenPrice,
    getBalanceNumber(pool.totalStaked, stakingToken.decimals),
    parseFloat(pool.tokenPerBlock),
  )
  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0
  const roundingDecimals = isHighValueToken ? 4 : 2

  //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
  const compoundFrequency = isAutoVault ? AUTO_VAULT_COMPOUND_FREQUENCY : MANUAL_POOL_COMPOUND_FREQUENCY

  if (isAutoVault) {
    const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice
    const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
      numberOfDays: 365,
      farmApr: apr,
      tokenPrice: earningTokenPrice,
      roundingDecimals,
      compoundFrequency,
      performanceFee,
    })
    const autoApr = apyModalRoi({
      amountEarned: tokenEarnedPerThousand365D,
      amountInvested: oneThousandDollarsWorthOfToken,
    })
    return { apr: autoApr, isHighValueToken, roundingDecimals, compoundFrequency }
  }
  return { apr, isHighValueToken, roundingDecimals, compoundFrequency }
}

export const getThopVaultEarnings = (
  account: string,
  thopAtLastUserAction: BigNumber,
  userShares: BigNumber,
  pricePerFullShare: BigNumber,
  earningTokenPrice: number,
) => {
  const hasAutoEarnings =
    account && thopAtLastUserAction && thopAtLastUserAction.gt(0) && userShares && userShares.gt(0)
  const { thopAsBigNumber } = convertSharesToThop(userShares, pricePerFullShare)
  const autoThopProfit = thopAsBigNumber.minus(thopAtLastUserAction)
  const autoThopToDisplay = autoThopProfit.gte(0) ? getBalanceNumber(autoThopProfit, 18) : 0

  const autoUsdProfit = autoThopProfit.times(earningTokenPrice)
  const autoUsdToDisplay = autoUsdProfit.gte(0) ? getBalanceNumber(autoUsdProfit, 18) : 0
  return { hasAutoEarnings, autoThopToDisplay, autoUsdToDisplay }
}

export const getPoolBlockInfo = (pool: Pool, currentBlock: number) => {
  const { startBlock, endBlock, isFinished } = pool
  const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock)
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0)
  const blocksRemaining = Math.max(endBlock - currentBlock, 0)
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0
  const blocksToDisplay = hasPoolStarted ? blocksRemaining : blocksUntilStart
  return { shouldShowBlockCountdown, blocksUntilStart, blocksRemaining, hasPoolStarted, blocksToDisplay }
}
