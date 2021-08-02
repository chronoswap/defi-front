import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useAppDispatch } from 'state'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text } from '@chronoswap-packages/uikit'
import styled from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useStakings, usePriceThopBusd, useGetApiPrices } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchStakingUserDataAsync } from 'state/actions'
import { Staking } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getStakingApy } from 'utils/apy'
import { orderBy } from 'lodash'

import { getAddress } from 'utils/addressHelpers'
import StakingCard, { StakingWithStakedValue } from './components/StakingCard/StakingCard'
import Table from './components/StakingTable/StakingTable'
import StakingTabButtons from './components/StakingTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/StakingTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Header = styled.div`
  padding: 32px 0px;
  background: ${({ theme }) => theme.colors.gradients.bubblegum};

  padding-left: 16px;
  padding-right: 16px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 24px;
    padding-right: 24px;
  }
`

const Stakings: React.FC = () => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const TranslateString = useI18n()
  const stakings = useStakings()
  const cakePrice = usePriceThopBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.CARD)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()

  const dispatch = useAppDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchStakingUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeStakings = stakings.filter((staking) => staking.pid !== 0 && staking.multiplier !== '0X')
  const inactiveStakings = stakings.filter((staking) => staking.pid !== 0 && staking.multiplier === '0X')

  const stakedOnlyStakings = activeStakings.filter(
    (staking) => staking.userData && new BigNumber(staking.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveStakings = inactiveStakings.filter(
    (staking) => staking.userData && new BigNumber(staking.userData.stakedBalance).isGreaterThan(0),
  )

  const sortStakings = (_stakings: StakingWithStakedValue[]): StakingWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(_stakings, (staking: StakingWithStakedValue) => staking.apy, 'desc')
      case 'multiplier':
        return orderBy(
          _stakings,
          (staking: StakingWithStakedValue) => (staking.multiplier ? Number(staking.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(_stakings, (staking: StakingWithStakedValue) => (staking.userData ? staking.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(_stakings, (staking: StakingWithStakedValue) => Number(staking.liquidity), 'desc')
      default:
        return _stakings
    }
  }

  const stakingsList = useCallback(
    (stakingsToDisplay: Staking[]): StakingWithStakedValue[] => {
      let stakingsToDisplayWithAPY: StakingWithStakedValue[] = stakingsToDisplay.map((staking) => {
        if (!staking.stakingTokenAmount || !prices) {
          return staking
        }

        const quoteTokenPriceUsd = prices[getAddress(staking.stakingToken.address, true).toLowerCase()]  // TODO true en el getAddress
        const totalLiquidity = new BigNumber(staking.stakingTokenAmount).times(quoteTokenPriceUsd)
        const apy = isActive ? getStakingApy(staking.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...staking, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        stakingsToDisplayWithAPY = stakingsToDisplayWithAPY.filter((staking: StakingWithStakedValue) => {
          return staking.stakingToken.symbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return stakingsToDisplayWithAPY
    },
    [cakePrice, prices, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  let stakingsStaked = []
  if (isActive) {
    stakingsStaked = stakedOnly ? stakingsList(stakedOnlyStakings) : stakingsList(activeStakings)
  } else {
    stakingsStaked = stakedOnly ? stakingsList(stakedInactiveStakings) : stakingsList(inactiveStakings)
  }

  stakingsStaked = sortStakings(stakingsStaked)

  const rowData = stakingsStaked.map((staking) => {
    const { rewardToken, stakingToken } = staking
    const tokenAddress = rewardToken.address
    const quoteTokenAddress = stakingToken.address
    const lpLabel = staking.stakingToken.symbol && staking.stakingToken.symbol.split(' ')[0].toUpperCase().replace('PANCAKE', '')

    const row: RowProps = {
      apr: {
        value: staking.apy && staking.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: staking.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: staking.apy,
      },
      staking: {
        image: staking.stakingToken.symbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: staking.pid,
      },
      earned: {
        earnings: staking.userData ? getBalanceNumber(new BigNumber(staking.userData.earnings)) : null,
        pid: staking.pid,
      },
      liquidity: {
        liquidity: staking.liquidity,
      },
      multiplier: {
        multiplier: staking.multiplier,
      },
      details: staking,
    }
    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'staking':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }
    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakingsStaked.map((staking) => (
              <StakingCard key={staking.pid} staking={staking} cakePrice={cakePrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {stakingsStaked.map((staking) => (
              <StakingCard key={staking.pid} staking={staking} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }

  return (
    <>
      <Header>
        <Heading as="h1" scale="xxl" color="secondary" mb="24px">
          {TranslateString(280, 'Staking')}
        </Heading>
        <Heading scale="lg" color="text">
          {TranslateString(589, 'Stake tokens to earn ThoP.')}
        </Heading>
      </Header>
      <Page>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} scale="sm" />
              <Text> {TranslateString(1116, 'Staked only')}</Text>
            </ToggleWrapper>
            <StakingTabButtons />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
        {renderContent()}
        <StyledImage src="/images/logo.svg" alt="Pancake illustration" width={120} height={120} />
      </Page>
    </>
  )
}

export default Stakings
