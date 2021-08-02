import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import Page from 'components/layout/Page'
import FarmStakingCard from 'views/Home/components/FarmStakingCard'
import ChronostoneCard from 'views/Home/components/ChronostoneCard'
import ThopStats from 'views/Home/components/ThopStats'
import TotalValueLockedCard from 'views/Home/components/TotalValueLockedCard'
import EarnAPYCard from 'views/Home/components/EarnAPYCard'
import UserValueCard from 'views/Home/components/UserValueCard'

const Hero = styled.div`
  align-items: center;
  background-position: top center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: 32px;
  padding-top: 116px;
  text-align: center;

  ${({ theme }) => theme.mediaQueries.lg} {
    height: 165px;
    padding-top: 0;
  }
`
// TODO cuando añadamos ChronostoneCard:
//    eliminar display
//    cambiar center por stretch en ambos
//    en FarmStakingCard eliminar la propiedad max-width
const Cards = styled(BaseLayout)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
  margin-top: 32px;

  & > div {
    grid-column: span 6;
    width: 100%;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 8;
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 6;
    }
  }
`

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <>
      <Page>
        <Hero>
          <Heading as="h1" scale="xl" mb="24px" color="secondary">
            {TranslateString(576, 'Chronoswap')}
          </Heading>
          <Text>{TranslateString(578, 'Your AMM and yield farm on Binance Smart Chain.')}</Text>
        </Hero>
        <>
          <Cards>
            <FarmStakingCard />
          </Cards>
          <TotalValueLockedCard />
          <Cards>
            <ThopStats />
            <UserValueCard />
          </Cards>
          <Cards>
            <EarnAPYCard />
          </Cards>
        </>
      </Page>
    </>
  )
}

export default Home
