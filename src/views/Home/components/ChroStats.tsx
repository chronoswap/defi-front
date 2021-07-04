import React from 'react'
import { Card, CardBody, Heading, Text } from '@chronoswap-packages/uikit'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { usePriceThopBusd } from 'state/hooks'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import useGetThoPPerBlock from 'hooks/useGetThoPPerBlock'
import { getCakeAddress } from 'utils/addressHelpers'
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

const ChroStats = () => {
  const TranslateString = useI18n()
  const totalSupply = getBalanceNumber(useTotalSupply())
  const burnedBalance = getBalanceNumber(useBurnedBalance(getCakeAddress()))
  const cakeSupply = totalSupply ? totalSupply - burnedBalance : 0
  const thoPPerBlock = getBalanceNumber(useGetThoPPerBlock())
  const priceCakeBusd = usePriceThopBusd()
  const marketCap = cakeSupply ? cakeSupply * priceCakeBusd.toNumber() : 0

  return (
    <StyledCakeStats>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {TranslateString(534, 'ThoP Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(535, 'Market Cap')}</Text>
          {marketCap && <CardValue fontSize="14px" prefix="$" value={marketCap} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Supply')}</Text>
          {totalSupply && <CardValue fontSize="14px" value={totalSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(538, 'Total Burned')}</Text>
          {burnedBalance && <CardValue fontSize="14px" decimals={3} value={burnedBalance} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(537, 'Circulating Supply')}</Text>
          {cakeSupply && <CardValue fontSize="14px" decimals={3} value={cakeSupply} />}
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New ThoP/block')}</Text>
          {thoPPerBlock && <CardValue fontSize="14px" decimals={3} value={thoPPerBlock} />}
        </Row>
      </CardBody>
    </StyledCakeStats>
  )
}

export default ChroStats
