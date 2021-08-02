import React from 'react'
import { Image } from '@chronoswap-packages/uikit'
import tokens from 'config/constants/tokens'
import { getAddress } from 'utils/addressHelpers'

const CakeVaultTokenPairImage = (props) => {
 const primaryTokenSrc = `/images/tokens/${getAddress(tokens.cake.address)}.svg`

 return <Image src={primaryTokenSrc} alt="tokenImage" width={64} height={64}/>
}

export default CakeVaultTokenPairImage
