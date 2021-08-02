import React from 'react'
import styled from 'styled-components'
import { Modal, Text, LinkExternal, Flex, Box } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { tokenEarnedPerThousandDollarsCompounding, apyModalRoi } from 'utils/compoundApyHelpers'

interface ApyCalculatorModalProps {
  onDismiss?: () => void
  tokenPrice: number
  apr: number
  displayApr?: string
  linkLabel: string
  linkHref: string
  earningTokenSymbol?: string
  roundingDecimals?: number
  compoundFrequency?: number
  performanceFee?: number
  isFarm?: boolean
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 12px;
`

const GridItem = styled.div``

const GridHeaderItem = styled.div`
  max-width: 180px;
`

const BulletList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  li {
    margin: 0;
    padding: 0;
  }
  li::before {
    content: '•';
    margin-right: 4px;
  }
  li::marker {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({
  onDismiss,
  tokenPrice,
  apr,
  displayApr,
  linkLabel,
  linkHref,
  earningTokenSymbol = 'CAKE',
  roundingDecimals = 2,
  compoundFrequency = 1,
  performanceFee = 0,
  isFarm = false,
}) => {
  const TranslateString = useI18n()
  const oneThousandDollarsWorthOfToken = 1000 / tokenPrice

  const tokenEarnedPerThousand1D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 1,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand7D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 7,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand30D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 30,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })
  const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
    numberOfDays: 365,
    farmApr: apr,
    tokenPrice,
    roundingDecimals,
    compoundFrequency,
    performanceFee,
  })

  return (
    <Modal title={TranslateString(585, 'ROI')} onDismiss={onDismiss}>
      {isFarm && (
        <Box>
          <Flex mb="8px" justifyContent="space-between">
            <Text small color="textSubtle">
              {TranslateString(353, 'APR (incl. LP rewards)')}
            </Text>
            <Text small>{displayApr}%</Text>
          </Flex>
          <Flex mb="24px" justifyContent="space-between">
            <Text small color="textSubtle">
              {TranslateString(357, 'Base APR (yield only)')}
            </Text>
            <Text small>{apr.toFixed(roundingDecimals)}%</Text>
          </Flex>
        </Box>
      )}
      <Grid>
        <GridHeaderItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            {TranslateString(583, 'Timeframe')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text
            textAlign="right"
            fontSize="12px"
            bold
            color="textSubtle"
            textTransform="uppercase"
            mr="12px"
            ml="12px"
            mb="12px"
          >
            {TranslateString(585, 'ROI')}
          </Text>
        </GridHeaderItem>
        <GridHeaderItem>
          <Text textAlign="right" fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="12px">
            {TranslateString(591, '%symbol% per $1,000', { symbol: earningTokenSymbol })}
          </Text>
        </GridHeaderItem>
        {/* 1 day row */}
        <GridItem>
          <Text>{TranslateString(595, '%num%d', { num: 1 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px">
            {apyModalRoi({ amountEarned: tokenEarnedPerThousand1D, amountInvested: oneThousandDollarsWorthOfToken })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right">{tokenEarnedPerThousand1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>{TranslateString(595, '%num%d', { num: 7 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px">
            {apyModalRoi({ amountEarned: tokenEarnedPerThousand7D, amountInvested: oneThousandDollarsWorthOfToken })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right">{tokenEarnedPerThousand7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>{TranslateString(595, '%num%d', { num: 30 })}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px">
            {apyModalRoi({
              amountEarned: tokenEarnedPerThousand30D,
              amountInvested: oneThousandDollarsWorthOfToken,
            })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right">{tokenEarnedPerThousand30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem style={{ maxWidth: '180px' }}>
          <Text>{TranslateString(597, '365d (APY)')}</Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right" mr="12px" ml="12px">
            {apyModalRoi({
              amountEarned: tokenEarnedPerThousand365D,
              amountInvested: oneThousandDollarsWorthOfToken,
            })}%
          </Text>
        </GridItem>
        <GridItem>
          <Text textAlign="right">{tokenEarnedPerThousand365D}</Text>
        </GridItem>
      </Grid>
      <Flex justifyContent="center">
        <Box mb="28px" maxWidth="280px" p="4px">
          <BulletList>
            <li>
              <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                {TranslateString(599, 'Calculated based on current rates.')}
              </Text>
            </li>
            <li>
              <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                {TranslateString(601, 'Compounding %freq%x daily.', { freq: compoundFrequency.toLocaleString() })}
              </Text>
            </li>
            {isFarm && (
              <li>
                <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                  {TranslateString(603, 'LP rewards: 0.17% trading fees, distributed proportionally among LP token holders.')}
                </Text>
              </li>
            )}
            <li>
              <Text fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                {TranslateString(605, 'All figures are estimates provided for your convenience only, and by no means represent guaranteed returns.')}
              </Text>
            </li>
            {performanceFee > 0 && (
              <li>
                <Text mt="14px" fontSize="12px" textAlign="center" color="textSubtle" display="inline">
                  {TranslateString(607, 'All estimated rates take into account this pool’s %fee%% performance fee', {
                    fee: performanceFee,
                  })}
                </Text>
              </li>
            )}
          </BulletList>
        </Box>
      </Flex>
      <Flex justifyContent="center">
        <LinkExternal href={linkHref}>{linkLabel}</LinkExternal>
      </Flex>
    </Modal>
  )
}

export default ApyCalculatorModal
