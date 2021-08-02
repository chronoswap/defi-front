import React from 'react'
import { Text } from '@chronoswap-packages/uikit'
import getTimePeriods from 'utils/getTimePeriods'
import useI18n from 'hooks/useI18n'

const WithdrawalFeeTimer: React.FC<{ secondsRemaining: number }> = ({ secondsRemaining }) => {
  const TranslateString = useI18n()
  const { days, hours, minutes } = getTimePeriods(secondsRemaining)

  return <Text fontSize="14px">{TranslateString(509, '%day%d : %hour%h : %minute%m', { day: days, hour: hours, minute: minutes })}</Text>
}

export default WithdrawalFeeTimer
