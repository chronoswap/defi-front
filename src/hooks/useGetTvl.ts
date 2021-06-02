import { useEffect, useState } from 'react'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'
import poolsConfig from 'config/constants/pools'
import tokens from 'config/constants/tokens'
import cakeABI from 'config/abi/cake.json'
import useRefresh from 'hooks/useRefresh'
import BigNumber from 'bignumber.js'
import { useFarms, usePriceCakeBusd, useGetApiPrices } from 'state/hooks'

const useGetStats = () => {
  const [balances, setBalance] = useState({pools: 0.0, farms: 0.0})
  const { fastRefresh } = useRefresh()
  const prices = useGetApiPrices()
  const cakePriceBusd = usePriceCakeBusd()
  const farmsLP = useFarms()

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

      const farmsPrice = []
      let quotePrice
      let tokenPrice
      let quoteTotalPrice
      let tokenTotalPrice
      // TODO A checkear porque tengo una ñapa con la api de precios que habrá que quitar en mainnet
      farmsLP.forEach(element => {
        quotePrice = prices[getAddress(element.quoteToken.address)] ? new BigNumber(prices[getAddress(element.quoteToken.address)]).toNumber() : cakePriceBusd.toNumber()
        tokenPrice = element.token === tokens.cake ? cakePriceBusd.toNumber() : new BigNumber(prices[getAddress(element.token.address)]).toNumber()
        quoteTotalPrice = element.quoteTokenAmount ? new BigNumber(element.quoteTokenAmount).times(quotePrice).toNumber() : 0
        tokenTotalPrice = element.tokenAmount ? new BigNumber(element.tokenAmount).times(tokenPrice).toNumber() : 0
        farmsPrice.push(Number.isNaN(quoteTotalPrice + tokenTotalPrice) ? 0 : (quoteTotalPrice + tokenTotalPrice));
      });

      const tokenBalanceFarmSum = farmsPrice.reduce((accum, earning) => {
        return accum + earning
      }, 0)
      setBalance({pools: tokenBalancePoolSum, farms: tokenBalanceFarmSum})
    }
    fetchBalances()
  }, [fastRefresh, prices, cakePriceBusd, farmsLP])

  const tvl = Math.round(new BigNumber(balances.pools).multipliedBy(cakePriceBusd).toNumber() * 100) / 100
  return tvl + balances.farms
}

export default useGetStats;
