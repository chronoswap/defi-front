import React from 'react'
import styled from 'styled-components'
import {
  Card,
  CardBody,
  Heading,
  Tag,
} from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { Nfts } from 'state/types'
import InfoRow from '../InfoRow'
import Preview from './Preview'

export interface NftCardProps {
  nft: Nfts
  tokenIds?: number[]
}

const Header = styled(InfoRow)`
  min-height: 28px;
`

const NftCard: React.FC<NftCardProps> = ({ nft }) => {
  const TranslateString = useI18n()
  const { name } = nft.properties

  return (
    <Card>
      <Preview nft={nft} />
      <CardBody>
        <Header>
          <Heading>{name}</Heading>
          <Tag outline variant="secondary">
            {TranslateString(728, 'In Wallet')}
          </Tag>
        </Header>
      </CardBody>
    </Card>
  )
}

export default NftCard
