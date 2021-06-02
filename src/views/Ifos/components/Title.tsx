import styled from 'styled-components'
import { Heading } from '@onekswaps/uikit'

const Title = styled(Heading).attrs({ scale: 'lg' })`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: 16px;
`

export default Title
