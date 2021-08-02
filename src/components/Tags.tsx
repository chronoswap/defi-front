import React from 'react'
import useI18n from 'hooks/useI18n'
import { Tag, VerifiedIcon, CommunityIcon, BinanceIcon, AutoRenewIcon, RefreshIcon } from '@chronoswap-packages/uikit'

const CoreTag = (props) => (
  <Tag variant="secondary" outline startIcon={<VerifiedIcon color="secondary" />} {...props}>
    Core
  </Tag>
)

const CommunityTag = (props) => (
  <Tag variant="textSubtle" outline startIcon={<CommunityIcon color="secondary" />} {...props}>
    Community
  </Tag>
)

const BinanceTag = (props) => (
  <Tag variant="binance" outline startIcon={<BinanceIcon color="secondary" />} {...props}>
    Binance
  </Tag>
)

const DualTag = (props) => (
  <Tag variant="textSubtle" outline {...props}>
    Dual
  </Tag>
)

const CompoundingPoolTag = (props) => {
  const TranslateString = useI18n()
  return (
    <Tag variant="success" outline startIcon={<AutoRenewIcon width="18px" color="success" mr="4px" />} {...props}>
      {TranslateString(615, 'Auto')}
    </Tag>
  )
}

const ManualPoolTag = (props) => {
  const TranslateString = useI18n()
  return (
    <Tag variant="secondary" outline startIcon={<RefreshIcon width="18px" color="secondary" mr="4px" />} {...props}>
      {TranslateString(617, 'Manual')}
    </Tag>
  )
}

export { CoreTag, CommunityTag, BinanceTag, DualTag, CompoundingPoolTag, ManualPoolTag }
