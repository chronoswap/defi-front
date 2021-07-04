import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { DEFAULT_GAS_LIMIT } from 'config'
import styled from 'styled-components'
import { Modal, Text, Flex, Button, HelpIcon, AutoRenewIcon, useTooltip } from '@chronoswap-packages/uikit'
import { getBalanceNumber } from 'utils/formatBalance'
import { useThopVaultContract } from 'hooks/useContract'
import useTheme from 'hooks/useTheme'
import useToast from 'hooks/useToast'
import useI18n from 'hooks/useI18n'
import UnlockButton from 'components/UnlockButton'
import Balance from 'components/Balance'
import { useThopVault, usePriceThopBusd } from 'state/hooks'

interface BountyModalProps {
  onDismiss?: () => void
  TooltipComponent: React.ElementType
}

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.backgroundDisabled};
  height: 1px;
  margin: 16px auto;
  width: 100%;
`

const BountyModal: React.FC<BountyModalProps> = ({ onDismiss, TooltipComponent }) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const { theme } = useTheme()
  const { toastError, toastSuccess } = useToast()
  const thopVaultContract = useThopVaultContract()
  const [pendingTx, setPendingTx] = useState(false)
  const {
    estimatedThopBountyReward,
    totalPendingThopHarvest,
    fees: { callFee },
  } = useThopVault()
  const thopPriceBusd = usePriceThopBusd()
  const callFeeAsDecimal = callFee / 100
  const totalYieldToDisplay = getBalanceNumber(totalPendingThopHarvest, 18)

  const estimatedDollarBountyReward = useMemo(() => {
    return new BigNumber(estimatedThopBountyReward).multipliedBy(thopPriceBusd)
  }, [thopPriceBusd, estimatedThopBountyReward])

  const hasFetchedDollarBounty = estimatedDollarBountyReward.gte(0)
  const hasFetchedThopBounty = estimatedThopBountyReward ? estimatedThopBountyReward.gte(0) : false
  const dollarBountyToDisplay = hasFetchedDollarBounty ? getBalanceNumber(estimatedDollarBountyReward, 18) : 0
  const thopBountyToDisplay = hasFetchedThopBounty ? getBalanceNumber(estimatedThopBountyReward, 18) : 0

  const { targetRef, tooltip, tooltipVisible } = useTooltip(<TooltipComponent fee={callFee} />, {
    placement: 'bottom',
    tooltipPadding: { right: 15 },
  })

  const handleConfirmClick = async () => {
    const tx = await thopVaultContract.methods.harvest({ gasLimit: DEFAULT_GAS_LIMIT })
    setPendingTx(true)
    const receipt = await tx.wait()
    if (receipt.status) {
      toastSuccess(TranslateString(287, 'Bounty collected!'), TranslateString(289, 'ThoP bounty has been sent to your wallet.'))
      setPendingTx(false)
      onDismiss()
    } else {
      toastError(
        TranslateString(479, 'Could not be collected'),
        TranslateString(483, 'There may be an issue with your transaction, or another user claimed the bounty first.'),
      )
      setPendingTx(false)
      onDismiss()
    }
  }

  return (
    <Modal title={TranslateString(481, 'Claim Bounty')} onDismiss={onDismiss} headerBackground={theme.colors.gradients.cardHeader}>
      {tooltipVisible && tooltip}
      <Flex alignItems="flex-start" justifyContent="space-between">
        <Text>{TranslateString(485, 'You’ll claim')}</Text>
        <Flex flexDirection="column">
          <Balance value={thopBountyToDisplay} decimals={7} unit=" ThoP" />
          <Text fontSize="12px" color="textSubtle">
            <Balance
              fontSize="12px"
              color="textSubtle"
              value={dollarBountyToDisplay}
              decimals={2}
              unit=" USD"
            />
          </Text>
        </Flex>
      </Flex>
      <Divider />
      <Flex alignItems="center" justifyContent="space-between">
        <Text fontSize="14px" color="textSubtle">
          {TranslateString(487, 'Pool total pending yield')}
        </Text>
        <Balance color="textSubtle" value={totalYieldToDisplay} unit=" CAKE" />
      </Flex>
      <Flex alignItems="center" justifyContent="space-between" mb="24px">
        <Text fontSize="14px" color="textSubtle">
          {TranslateString(489, 'Bounty')}
        </Text>
        <Text fontSize="14px" color="textSubtle">
          {callFeeAsDecimal}%
        </Text>
      </Flex>
      {account ? (
        <Button
          isLoading={pendingTx}
          disabled={!dollarBountyToDisplay || !thopBountyToDisplay || !callFee}
          endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
          onClick={handleConfirmClick}
          mb="28px"
        >
          {pendingTx ? TranslateString(488, 'Confirming') : TranslateString(464, 'Confirm')}
        </Button>
      ) : (
        <UnlockButton mb="28px" />
      )}
      <Flex justifyContent="center" alignItems="center">
        <Text fontSize="16px" bold color="textSubtle" mr="4px">
          {TranslateString(467, 'What’s this?')}
        </Text>
        <span ref={targetRef}>
          <HelpIcon color="textSubtle" />
        </span>
      </Flex>
    </Modal>
  )
}

export default BountyModal
