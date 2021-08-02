import React from 'react'
import useI18n from 'hooks/useI18n'
import styled from 'styled-components'
import { Modal, Text, Button, OpenNewIcon, Link } from '@chronoswap-packages/uikit'
import { BASE_EXCHANGE_URL } from 'config'
import useTheme from 'hooks/useTheme'

interface NotEnoughTokensModalProps {
  tokenSymbol: string
  onDismiss?: () => void
}

const StyledLink = styled(Link)`
  width: 100%;
`

const NotEnoughTokensModal: React.FC<NotEnoughTokensModalProps> = ({ tokenSymbol, onDismiss }) => {
  const TranslateString = useI18n()
  const { theme } = useTheme()

  return (
    <Modal
      title={TranslateString(575, '%symbol% required', { symbol: tokenSymbol })}
      onDismiss={onDismiss}
      headerBackground={theme.colors.gradients.cardHeader}
    >
      <Text color="failure" bold>
        {TranslateString(431, 'Insufficient %symbol% balance', { symbol: tokenSymbol })}
      </Text>
      <Text mt="24px">{TranslateString(417, 'You’ll need %symbol% to stake in this pool!', { symbol: tokenSymbol })}</Text>
      <Text>
        {TranslateString(419, 'Buy some %symbol%, or make sure your %symbol% isn’t in another pool or LP.', {
          symbol: tokenSymbol,
        })}
      </Text>
      <Button mt="24px" as="a" external href={BASE_EXCHANGE_URL}>
        {TranslateString(421, 'Buy')} {tokenSymbol}
      </Button>
      <StyledLink href="https://yieldwatch.net" external>
        <Button variant="secondary" mt="8px" width="100%">
          {TranslateString(422, 'Locate Assets')}
          <OpenNewIcon color="primary" ml="4px" />
        </Button>
      </StyledLink>
      <Button variant="text" onClick={onDismiss}>
        {TranslateString(438, 'Close Window')}
      </Button>
    </Modal>
  )
}

export default NotEnoughTokensModal
