import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton } from '@chronoswap-packages/uikit'
import { provider as ProviderType } from 'web3-core'
import useI18n from 'hooks/useI18n'
import useStakingStakedPrice from 'hooks/useStakingStakedPrice'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { BASE_ADD_LIQUIDITY_URL } from 'config'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Staking } from 'state/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface StakingWithStakedValue extends Staking {
  apy?: number
  liquidity?: BigNumber
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

interface StakingCardProps {
  staking: StakingWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  provider?: ProviderType
  account?: string
}

const StakingCard: React.FC<StakingCardProps> = ({ staking, removed, cakePrice, account }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const isCommunityStaking = false
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  const stakingImage = staking.stakingToken.symbol.toLocaleLowerCase()

  const totalValueFormatted = staking.liquidity
    ? `$${staking.liquidity.toNumber().toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'
  const lpLabel = staking.stakingToken.symbol && staking.stakingToken.symbol.toUpperCase()
  const earnLabel = staking.rewardToken ? staking.rewardToken.symbol : 'ThoP'
  const feeLabel = staking.depositFee ? staking.depositFee : '0%'
  const stakingAPY = staking.apy && staking.apy.toLocaleString('en-US', { maximumFractionDigits: 2 })

  const liquidityUrlPathParts = getLiquidityUrlPathParts({
    quoteTokenAddress: staking.stakingToken.address,
    tokenAddress: staking.rewardToken.address,
  })
  const addLiquidityUrl = `${BASE_ADD_LIQUIDITY_URL}/${liquidityUrlPathParts}`
  const lpAddress = staking.stakingToken.address[process.env.REACT_APP_CHAIN_ID]
  const stakingStakedPrice = useStakingStakedPrice(staking.pid)
  const lpPriceFormatted = stakingStakedPrice.stakingTokenPrice
    ? `$${stakingStakedPrice.stakingTokenPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}`
    : '-'
  return (
    <FCard>
      {staking.rewardToken.symbol === 'ThoP' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={staking.multiplier}
        isCommunityStaking={isCommunityStaking}
        stakingImage={stakingImage}
        tokenSymbol={staking.stakingToken.symbol}
      />
      {!removed && (
        <Flex justifyContent="space-between" alignItems="center">
          <Text>{TranslateString(736, 'APR')}:</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {staking.apy ? (
              <>
                <ApyButton lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} cakePrice={cakePrice} apy={staking.apy} />
                {stakingAPY}%
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Flex justifyContent="space-between">
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(10001, 'Deposit fee')}:</Text>
        <Text bold>{feeLabel}%</Text>
      </Flex>
      <CardActionsContainer staking={staking} account={account} addLiquidityUrl={addLiquidityUrl} />
      <Divider />
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          bscScanAddress={`https://bscscan.com/address/${staking.stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`}
          infoAddress={`https://pancakeswap.info/tokens/${lpAddress}`}
          totalValueFormatted={totalValueFormatted}
          lpLabel={lpLabel}
          addLiquidityUrl={addLiquidityUrl}
          lpValue = {lpPriceFormatted}
        />
      </ExpandingWrapper>
    </FCard>
  )
}

export default StakingCard
