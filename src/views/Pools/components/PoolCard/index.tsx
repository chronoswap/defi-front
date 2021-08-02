import BigNumber from 'bignumber.js'
import React from 'react'
import styled from 'styled-components'
import { CardHeader, Heading, CardBody, Flex, Text, Image, CardRibbon } from '@chronoswap-packages/uikit'
import UnlockButton from 'components/UnlockButton'
import useI18n from 'hooks/useI18n'
import { Pool } from 'state/types'
import { Token } from 'config/constants/types'
import AprRow from './AprRow'
import { StyledCard, StyledCardInner } from './StyledCard'
import CardFooter from './CardFooter'
import CardActions from './CardActions'

const BIG_ZERO = new BigNumber(0)

const Wrapper = styled(CardHeader)<{ isFinished?: boolean; background?: string }>`
  background: ${({ isFinished, background, theme }) =>
    isFinished ? theme.colors.backgroundDisabled : theme.colors.gradients[background]};
  border-radius: ${({ theme }) => `${theme.radii.card} ${theme.radii.card} 0 0`};
`

const StyledCardHeader: React.FC<{
  earningToken: Token
  stakingToken: Token
  isAutoVault?: boolean
  isFinished?: boolean
  isStaking?: boolean
}> = ({ earningToken, stakingToken, isFinished = false, isAutoVault = false, isStaking = false }) => {
  const TranslateString = useI18n()
  const isCakePool = earningToken.symbol === 'ThoP' && stakingToken.symbol === 'ThoP'
  const background = isStaking ? 'bubblegum' : 'cardHeader'

  const getHeadingPrefix = () => {
    if (isAutoVault) {
      // vault
      return TranslateString(615, 'Auto')
    }
    if (isCakePool) {
      // manual cake
      return TranslateString(617, 'Manual')
    }
    // all other pools
    return TranslateString(318, 'Earn')
  }

  const getSubHeading = () => {
    if (isAutoVault) {
      return TranslateString(619, 'Automatic restaking')
    }
    if (isCakePool) {
      return TranslateString(319, 'Earn ThoP, stake ThoP')
    }
    return TranslateString(321, 'Stake %symbol%', { symbol: stakingToken.symbol })
  }

  return (
    <Wrapper isFinished={isFinished} background={background}>
      <Flex alignItems="center" justifyContent="space-between">
        <Flex flexDirection="column">
          <Heading color={isFinished ? 'textDisabled' : 'body'} scale="lg">
            {`${getHeadingPrefix()} ${earningToken.symbol}`}
          </Heading>
          <Text color={isFinished ? 'textDisabled' : 'textSubtle'}>{getSubHeading()}</Text>
        </Flex>
        {isAutoVault ? (
          <Image src={`/images/farms/${earningToken.symbol}.svg`} alt={earningToken.symbol} width={64} height={64} />
        ) : (
          <Image src={`/images/farms/${earningToken.symbol}.svg`} alt={earningToken.symbol} width={64} height={64} />
        )}
      </Flex>
    </Wrapper>
  )
}

const PoolCard: React.FC<{ pool: Pool; account: string }> = ({ pool, account }) => {
  const { sousId, stakingToken, earningToken, isFinished, userData } = pool
  const TranslateString = useI18n()
  const stakedBalance = userData?.stakedBalance ? new BigNumber(userData.stakedBalance) : BIG_ZERO
  const accountHasStakedBalance = stakedBalance.gt(0)

  return (
    <StyledCard
      isFinished={isFinished && sousId !== 0}
      ribbon={isFinished && <CardRibbon variantColor="textDisabled" text={TranslateString(388, 'Finished')} />}
    >
      <StyledCardInner>
        <StyledCardHeader
          isStaking={accountHasStakedBalance}
          earningToken={earningToken}
          stakingToken={stakingToken}
          isFinished={isFinished && sousId !== 0}
        />
        <CardBody>
          <AprRow pool={pool} />
          <Flex mt="24px" flexDirection="column">
            {account ? (
              <CardActions pool={pool} stakedBalance={stakedBalance} />
            ) : (
              <>
                <Text mb="10px" textTransform="uppercase" fontSize="12px" color="textSubtle" bold>
                  {TranslateString(409, 'Start earning')}
                </Text>
                <UnlockButton />
              </>
            )}
          </Flex>
        </CardBody>
        <CardFooter pool={pool} account={account} />
      </StyledCardInner>
    </StyledCard>
  )
}

export default PoolCard
