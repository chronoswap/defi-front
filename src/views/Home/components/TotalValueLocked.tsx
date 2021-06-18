import React from 'react'
import styled from 'styled-components'
import { Heading, Skeleton, Text } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import useGetStats from 'hooks/useGetTvl'
import CardValue from './CardValue'

const TvlHeading = styled(Heading)`
  align-items: center;
  display: flex;
  justify-content: center;
`

const CenteredText = styled(Text)`
  text-align: center;
`

const TotalValueLocked = () => {
  const TranslateString = useI18n()
  const tvl = useGetStats()

  return (
    <>
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
    </>
  )
}

export default TotalValueLocked
