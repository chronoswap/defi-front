import React from 'react'
import styled from 'styled-components'
import { Nfts } from 'state/types'

interface PreviewProps {
  nft: Nfts
  isOwned?: boolean
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.cardBorder};
  position: relative;
  width: 100%;
  overflow: hidden;
  padding-bottom: 100%;
`

const StyledImage = styled.img`
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  transition: opacity 1s linear;
  height: 100%;
  object-fit: cover;
  border-radius: 32px 32px 0 0;
`

const Preview: React.FC<PreviewProps> = ({ nft, isOwned = false }) => {
  const { image, name } = nft.properties
  const previewImageSrc = '/images/nfts/circular.lg'

  const previewImage = <StyledImage src={previewImageSrc} alt={name} />

  return (
    <Container>
      {isOwned ? (
        <a href="https://previews.123rf.com/images/dny3d/dny3d1512/dny3d151200027/50232830-3d-old-wooden-crate-on-white-background.jpg" target="_blank" rel="noreferrer noopener">
          {previewImage}
        </a>
      ) : (
        previewImage
      )}
    </Container>
  )
}

export default Preview
