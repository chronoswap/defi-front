import React from 'react'
import { Flex, TooltipText, IconButton, useModal, CalculateIcon, Skeleton, useTooltip } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { useGetApiPrice, usePriceThopBusd } from 'state/hooks'
import Balance from 'components/Balance'
import ApyCalculatorModal from 'components/ApyCalculatorModal'
import { Pool } from 'state/types'
import { BASE_EXCHANGE_URL } from 'config'
import { getAprData } from 'utils/poolHelpers'
import { getAddress } from 'utils/addressHelpers'

interface AprRowProps {
  pool: Pool
  performanceFee?: number
}

const AprRow: React.FC<AprRowProps> = ({ pool, performanceFee = 0 }) => {
  const TranslateString = useI18n()
  const { stakingToken, earningToken, isFinished, isAutoVault } = pool
  const stakingTokenPrice1 = usePriceThopBusd().toNumber()
  const stakingTokenPrice2 = useGetApiPrice(stakingToken.address ? getAddress(stakingToken.address, true) : "")
  const stakingTokenPrice = stakingToken.symbol !== 'ThoP' ? stakingTokenPrice1:stakingTokenPrice2
  const earningTokenPrice1 = usePriceThopBusd().toNumber()
  const earningTokenPrice2 = useGetApiPrice(earningToken.address ? getAddress(earningToken.address, true) : "")
  const earningTokenPrice = earningToken.symbol !== 'ThoP' ? earningTokenPrice1:earningTokenPrice2
  const apr = 0

  const tooltipContent = isAutoVault
    ? TranslateString(511, 'APY includes compounding, APR doesn’t. This pool’s CAKE is compounded automatically, so we show APY.')
    : TranslateString(513, 'This pool’s rewards aren’t compounded automatically, so we show APR')

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-start' })

  const { apr: earningsPercentageToDisplay, roundingDecimals, compoundFrequency } = getAprData(pool, performanceFee, stakingTokenPrice, earningTokenPrice)
  const apyModalLink =
    stakingToken.address && `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${getAddress(stakingToken.address)}`

  const [onPresentApyModal] = useModal(
    <ApyCalculatorModal
      tokenPrice={earningTokenPrice}
      apr={apr}
      linkLabel={TranslateString(507, 'Get %symbol%', { symbol: stakingToken.symbol })}
      linkHref={apyModalLink || BASE_EXCHANGE_URL}
      earningTokenSymbol={earningToken.symbol}
      roundingDecimals={roundingDecimals}
      compoundFrequency={compoundFrequency}
      performanceFee={performanceFee}
    />,
  )

  return (
    <Flex alignItems="center" justifyContent="space-between">
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isAutoVault ? `${TranslateString(609, 'APY')}:` : `${TranslateString(611, 'APR')}:`}</TooltipText>
      {isFinished || !apr ? (
        <Skeleton width="82px" height="32px" />
      ) : (
        <Flex alignItems="center">
          <Balance
            fontSize="16px"
            isDisabled={isFinished}
            value={Number(earningsPercentageToDisplay)}
            decimals={2}
            unit="%"
          />
          <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton>
        </Flex>
      )}
    </Flex>
  )
}

export default AprRow
