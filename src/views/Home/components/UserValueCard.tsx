import React from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { Text, Card, CardBody, Heading } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { usePriceThopBusd } from 'state/hooks'
import useAllEarnings from 'hooks/useAllEarnings'
import useStakedPrices from 'hooks/useStakedPrices'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'

const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`

const UserValueCard = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const stakedPrices = useStakedPrices()
  // Farms staked
  const farmsWithStake = stakedPrices.farms
  const priceInFarms = farmsWithStake.reduce((accum, farm) => {
    return accum + new BigNumber(farm.userData.stakedBalance).div(new BigNumber(10).pow(18)).times(farm.lpPrice).toNumber()
  }, 0)
  // Stakings staked
  const stakingsWithStake = stakedPrices.stakings
  const priceInStakings = stakingsWithStake.reduce((accum, staking) => {
    return accum + new BigNumber(staking.userData.stakedBalance).div(new BigNumber(10).pow(18)).times(staking.stakingTokenPrice).toNumber()
  }, 0)
  // Pools staked
  const poolsWithStake = stakedPrices.pools
  const priceInPools = poolsWithStake.reduce((accum, pool) => {
    return accum + new BigNumber(pool.userData.stakedBalance).div(new BigNumber(10).pow(18)).times(pool.stakingTokenPrice).toNumber()
  }, 0)
  // Earnings to harvest
  const allEarnings = useAllEarnings()
  const earningsSum = allEarnings.reduce((accum, earning) => {
    return accum + new BigNumber(earning).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const cakePriceBusd = usePriceThopBusd()
  const earningsBusd = new BigNumber(earningsSum).multipliedBy(cakePriceBusd).toNumber()

  const totalValue = priceInFarms + earningsBusd + priceInPools + priceInStakings

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {TranslateString(281, 'My total value')}
        </Heading>
        {account ? (
          <>
            <Row>
              <Text fontSize="14px">{TranslateString(539, 'Value in farms')}</Text>
              {priceInFarms && <CardValue fontSize="14px" prefix="$" value={priceInFarms} />}
            </Row>
            <Row>
              <Text fontSize="14px">{TranslateString(545, 'Value in staking')}</Text>
              {priceInStakings && <CardValue fontSize="14px" prefix="$" value={priceInStakings} />}
            </Row>
            <Row>
              <Text fontSize="14px">{TranslateString(541, 'Value in pools')}</Text>
              {priceInPools && <CardValue fontSize="14px" prefix="$" value={priceInPools} />}
            </Row>
            <Row>
              <Text fontSize="14px">{TranslateString(543, 'Value to harvest')}</Text>
              {earningsBusd && <CardValue fontSize="14px" prefix="$" value={earningsBusd} />}
            </Row>
            <Row>
              <Text fontSize="14px">{TranslateString(408, 'Total')}</Text>
              {totalValue && <CardValue fontSize="14px" prefix="$" value={totalValue} />}
            </Row>
          </>
        ) : (
          <UnlockButton width="100%" />
        )}
      </CardBody>
    </StyledCakeStats>
  )
}

export default UserValueCard
