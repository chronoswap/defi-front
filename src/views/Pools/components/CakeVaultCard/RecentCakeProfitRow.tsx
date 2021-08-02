import React from 'react'
import { Flex, Text } from '@chronoswap-packages/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import { useThopVault, usePriceThopBusd } from 'state/hooks'
import { getThopVaultEarnings } from 'utils/poolHelpers'
import RecentCakeProfitBalance from './RecentCakeProfitBalance'

const RecentCakeProfitCountdownRow = () => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const {
    pricePerFullShare,
    userData: { thopAtLastUserAction, userShares, lastUserActionTime },
  } = useThopVault()
  const cakePriceBusd = usePriceThopBusd()
  const { hasAutoEarnings, autoThopToDisplay, autoUsdToDisplay } = getThopVaultEarnings(
    account,
    thopAtLastUserAction,
    userShares,
    pricePerFullShare,
    cakePriceBusd.toNumber(),
  )

  const lastActionInMs = lastUserActionTime && parseInt(lastUserActionTime) * 1000
  const dateTimeLastAction = new Date(lastActionInMs)
  const dateStringToDisplay = dateTimeLastAction.toLocaleString()

  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Text fontSize="14px">{`${TranslateString(396, 'Recent ThoP profit')}:`}</Text>
      {hasAutoEarnings && (
        <RecentCakeProfitBalance
          cakeToDisplay={autoThopToDisplay}
          dollarValueToDisplay={autoUsdToDisplay}
          dateStringToDisplay={dateStringToDisplay}
        />
      )}
    </Flex>
  )
}

export default RecentCakeProfitCountdownRow
