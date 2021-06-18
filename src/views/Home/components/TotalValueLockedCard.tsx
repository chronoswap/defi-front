import React from 'react'
import styled from 'styled-components'
import { Card, CardBody, Heading } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import TotalValueLocked from './TotalValueLocked'

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  justify-content: center;
`

const TotalValueLockedCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading scale="lg" mb="24px">
          {TranslateString(762, 'Total Value Locked (TVL)')}
        </Heading>
        <TotalValueLocked />
      </CardBody>
    </StyledTotalValueLockedCard>
  )
}

export default TotalValueLockedCard
