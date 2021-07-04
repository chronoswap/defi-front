import { useEffect, useState } from 'react'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import poolsConfig from 'config/constants/pools'
import tokens from 'config/constants/tokens'
import cakeABI from 'config/abi/cake.json'
import useRefresh from 'hooks/useRefresh'
import BigNumber from 'bignumber.js'
import { useFarms, useStakings, usePriceThopBusd, useGetApiPrices } from 'state/hooks'

const getFarmPricesJson = (farmsLP, prices, cakePriceBusd) => {
  const result = []
  farmsLP.forEach(element => {
    let quotePrice = new BigNumber(0).toNumber();
    let tokenPrice = new BigNumber(0).toNumber();
    if (prices) {
      quotePrice = prices[getAddress(element.quoteToken.address)] ? new BigNumber(prices[getAddress(element.quoteToken.address, true)]).toNumber() : new BigNumber(prices[getAddress(element.quoteToken.address, true)]).toNumber();
      tokenPrice = element.token === tokens.cake ? cakePriceBusd.toNumber() : new BigNumber(prices[getAddress(element.token.address, true)]).toNumber();
    }
    const quoteTotalPrice = element.quoteTokenAmount ? new BigNumber(element.quoteTokenAmount).times(quotePrice).toNumber() : 0
    const tokenTotalPrice = element.tokenAmount ? new BigNumber(element.tokenAmount).times(tokenPrice).toNumber() : 0
    result.push(Number.isNaN(quoteTotalPrice + tokenTotalPrice) ? 0 : (quoteTotalPrice + tokenTotalPrice));
  });
  return result
}

const getStakingPricesJson = (stakings, prices, cakePriceBusd) => {
  const result = []
  stakings.forEach(element => {
    let stakingTokenPrice = cakePriceBusd;
    if (prices) {
      stakingTokenPrice = new BigNumber(prices[getAddress(element.stakingToken.address, true)]).toNumber();  // TODO ojo con el true en todo este fichero
    }
    const stakingTotalPrice = element.stakingTokenAmount ? new BigNumber(element.stakingTokenAmount).times(stakingTokenPrice).toNumber() : 0
    result.push(Number.isNaN(stakingTotalPrice) ? 0 : stakingTotalPrice);
  });
  return result
}

const useGetStats = () => {
  const [balances, setBalance] = useState({pools: 0.0, farms: 0.0, stakings: 0.0})
  const { slowRefresh } = useRefresh()
  const prices = useGetApiPrices()
  const cakePriceBusd = usePriceThopBusd()
  const farmsLP = useFarms()
  const stakings = useStakings()

  const farmsPrice = getFarmPricesJson(farmsLP, prices, cakePriceBusd)
  const tokenBalanceFarmSum = farmsPrice.reduce((accum, earning) => {
    return accum + earning
  }, 0)

  const stakingsPrice = getStakingPricesJson(stakings, prices, cakePriceBusd)
  const tokenBalanceStakingSum = stakingsPrice.reduce((accum, earning) => {
    return accum + earning
  }, 0)

  useEffect(() => {
    const fetchBalances = async () => {
      const poolCalls = poolsConfig.map((poolConfig) => ({
        address: getAddress(tokens.cake.address),
        name: 'balanceOf',
        params: [getAddress(poolConfig.contractAddress)],
      }))
      const tokenBalancePool = await multicall(cakeABI, poolCalls)
      const tokenBalancePoolSum = tokenBalancePool.reduce((accum, earning) => {
        return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
      }, 0)
      setBalance({pools: tokenBalancePoolSum, farms: tokenBalanceFarmSum, stakings: tokenBalanceStakingSum})
    }
    fetchBalances()
  }, [slowRefresh, tokenBalanceFarmSum, tokenBalanceStakingSum])

  const tvl = Math.round(new BigNumber(balances.pools).multipliedBy(cakePriceBusd).toNumber() * 100) / 100
  return tvl + balances.farms + balances.stakings
}

export default useGetStats;
