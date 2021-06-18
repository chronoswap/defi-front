import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { useCountUp } from 'react-countup'
import { Text } from '@chronoswap-packages/uikit'

export interface CardValueProps {
  value: number
  decimals?: number
  fontSize?: string
  lineHeight?: string
  prefix?: string
  bold?: boolean
  color?: string
}

const TextLeft = styled(Text)`
  text-align: left;
  margin-top: 5px;
`

const CardValue: React.FC<CardValueProps> = ({
  value,
  decimals,
  fontSize = '40px',
  lineHeight = '1',
  prefix = '',
  bold = true,
  color = 'text',
}) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  })

  const updateValue = useRef(update)

  useEffect(() => {
    updateValue.current(value)
  }, [value, updateValue])

  return (
    <TextLeft bold={bold} fontSize={fontSize} style={{ lineHeight }} color={color}>
      {prefix}
      {countUp}
    </TextLeft>
  )
}

export default CardValue
