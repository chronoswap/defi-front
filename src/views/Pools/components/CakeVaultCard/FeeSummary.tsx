import React from 'react'
import { Text, Flex, useTooltip, TooltipText } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { useThopVault } from 'state/hooks'
import UnstakingFeeCountdownRow from './UnstakingFeeCountdownRow'

interface FeeSummaryProps {
  stakingTokenSymbol: string
  stakeAmount: string
}

const FeeSummary: React.FC<FeeSummaryProps> = ({ stakingTokenSymbol, stakeAmount }) => {
  const TranslateString = useI18n()
  const {
    fees: { withdrawalFee },
  } = useThopVault()
  const feeAsDecimal = withdrawalFee / 100
  const feeInCake = (parseFloat(stakeAmount) * (feeAsDecimal / 100)).toFixed(4)
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <>
      <Text bold mb="4px">
        {TranslateString(391, 'Unstaking fee: %fee%%', { fee: feeAsDecimal })}
      </Text>
      <Text>
        {TranslateString(389, 'Only applies within 3 days of staking. Unstaking after 3 days will not include a fee. Timer resets every time you stake new CAKE in the pool.')}
      </Text>
    </>,
    { placement: 'top-start' },
  )

  return (
    <>
      <Flex mt="24px" alignItems="center" justifyContent="space-between">
        {tooltipVisible && tooltip}
        <TooltipText ref={targetRef} small>
          {TranslateString(393, 'Unstaking Fee')}
        </TooltipText>
        <Text fontSize="14px">
          {stakeAmount ? feeInCake : '-'} {stakingTokenSymbol}
        </Text>
      </Flex>
      <UnstakingFeeCountdownRow />
    </>
  )
}

export default FeeSummary
