import React from 'react'
import { CardHeader, Heading, Image, Text, Flex } from '@chronoswap-packages/uikit'
import styled from 'styled-components'
import useI18n from 'hooks/useI18n'
import { Token } from 'config/constants/types'

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


export default StyledCardHeader
