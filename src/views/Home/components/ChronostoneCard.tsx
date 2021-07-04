import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { Heading, Card, CardBody, Button } from '@chronoswap-packages/uikit'
import { useWeb3React } from '@web3-react/core'
import useI18n from 'hooks/useI18n'
import useGetWalletNfts from 'hooks/useGetWalletNfts'
import UnlockButton from 'components/UnlockButton'
import CardValue from './CardValue'

const StyledFarmStakingCard = styled(Card)`
  background-image: url('/images/chrono-bg.svg');
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 376px;
`

const Block = styled.div`
  display: flex;
  margin-bottom: 16px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 14px;
`

const Actions = styled.div`
  margin-top: 24px;
`

const ChronostoneCard = () => {
  const { account } = useWeb3React()
  const TranslateString = useI18n()
  const history = useHistory()
  const walletNft = useGetWalletNfts()
  const cardsInWallet = walletNft?walletNft.filter((nft) => nft.title.includes("Card")):[]
  const cratesInWallet = walletNft?walletNft.filter((nft) => !nft.title.includes("Card")):[]

  const toCollectibles = () => {
    history.push('/collectibles')
  }

  return (
    <StyledFarmStakingCard>
      <CardBody>
        <Heading scale="xl" mb="24px">
          {TranslateString(577, 'Chronostone')}
        </Heading>
        <Block>
          <Label>{TranslateString(729, 'Cards in wallet')}:</Label>
          <CardValue value={cardsInWallet.length} lineHeight="1.5" decimals={0} />
        </Block>
        <Block>
          <Label>{TranslateString(730, 'Crates in Wallet')}:</Label>
          <CardValue value={cratesInWallet.length} lineHeight="1.5" decimals={0} />
        </Block>
        <Actions>
          {account ? (
            <Button
              id="get-nft"
              width="100%"
              onClick={toCollectibles}
            >
            {TranslateString(731, 'Get more NFT')}
            </Button>
          ) : (
            <UnlockButton width="100%" />
          )}
        </Actions>
      </CardBody>
    </StyledFarmStakingCard>
  )
}

export default ChronostoneCard
