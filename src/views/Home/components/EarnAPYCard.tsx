import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Flex, ArrowForwardIcon, Skeleton } from '@chronoswap-packages/uikit'
import max from 'lodash/max'
import { NavLink } from 'react-router-dom'
import useI18n from 'hooks/useI18n'
import useGetThoPPerBlock from 'hooks/useGetThoPPerBlock'
import BigNumber from 'bignumber.js'
import { getFarmApy } from 'utils/apy'
import { useFarms, usePriceThopBusd, useGetApiPrices } from 'state/hooks'
import { getAddress } from 'utils/addressHelpers'

const StyledFarmStakingCard = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;

  ${({ theme }) => theme.mediaQueries.lg} {
    margin: 0;
    max-width: none;
  }
`
const CardMidContent = styled(Heading).attrs({ size: 'xl' })`
  line-height: 44px;
`
const EarnAPYCard = () => {
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const prices = useGetApiPrices()
  const cakePrice = usePriceThopBusd()
  const _thopPerBlock = useGetThoPPerBlock()

  const highestApy = useMemo(() => {
    const apys = farmsLP
      // Filter inactive farms, because their theoretical APY is super high. In practice, it's 0.
      .filter((farm) => farm.pid !== 0 && farm.multiplier !== '0X')
      .map((farm) => {

        const thopPerBlock = new BigNumber(_thopPerBlock.div(10**18))
        if (farm.lpTotalInQuoteToken && prices) {  // TODO la funcion get Address ojito con el true
          const quoteTokenPriceUsd = prices[getAddress(farm.quoteToken.address, true).toLowerCase()]
          const totalLiquidity = new BigNumber(farm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
          return getFarmApy(farm.poolWeight, cakePrice, totalLiquidity, thopPerBlock)
        }
        return null
      })

    const maxApy = max(apys)
    return maxApy?.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }, [cakePrice, farmsLP, prices, _thopPerBlock])

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading color="contrast" scale="lg">
          Earn up to
        </Heading>
        <CardMidContent>
          {highestApy ? (
            `${highestApy}% ${TranslateString(736, 'APR')}`
          ) : (
            <Skeleton animation="pulse" variant="rect" height="44px" />
          )}
        </CardMidContent>
        <Flex justifyContent="space-between">
          <Heading color="contrast" scale="lg">
            in Farms
          </Heading>
          <NavLink exact activeClassName="active" to="/farms" id="farm-apy-cta">
            <ArrowForwardIcon mt={30} color="primary" />
          </NavLink>
        </Flex>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default EarnAPYCard
