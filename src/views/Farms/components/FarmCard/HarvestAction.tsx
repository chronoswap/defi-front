import React, { useState } from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { useHarvest } from 'hooks/useHarvest'
import { usePriceCakeBusd } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useWeb3React } from '@web3-react/core'
import CardBusdValue from '../../../Home/components/CardBusdValue'

interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const HeadingLeft = styled(Heading)`
  text-align: left;
`
const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)

  const cakePrice = usePriceCakeBusd()
  const rawEarningsBalance = account ? getBalanceNumber(earnings) : 0
  const earningsUsd = cakePrice.times(rawEarningsBalance).toNumber()
  const displayBalance = rawEarningsBalance.toLocaleString()

  return (
    <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <HeadingLeft color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
        {displayBalance}
        <CardBusdValue value={earningsUsd}/>
      </HeadingLeft>
      <Button
        disabled={rawEarningsBalance === 0 || pendingTx}
        onClick={async () => {
          setPendingTx(true)
          await onReward()
          setPendingTx(false)
        }}
      >
        {TranslateString(562, 'Harvest')}
      </Button>
    </Flex>
  )
}

export default HarvestAction
