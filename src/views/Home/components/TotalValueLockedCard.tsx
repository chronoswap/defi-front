import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading, Skeleton, Text } from '@onekswaps/uikit'
import useI18n from 'hooks/useI18n'
import useGetStats from 'hooks/useGetTvl'
import CardValue from './CardValue'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  justify-content: center;
`

const TvlHeading = styled(Heading)`
  align-items: center;
  display: flex;
  justify-content: center;
`

const CenteredText = styled(Text)`
  text-align: center;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()
  const tvl = useGetStats()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        {tvl ? (
          <>
            <TvlHeading scale="xl">
              $<CardValue value={tvl}/>
            </TvlHeading>
            <CenteredText color="textSubtle">
              {TranslateString(764, 'Across all LPs and Syrup Pools')}
            </CenteredText>
          </>
        ) : (
          <Skeleton height={66} />
        )}
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
