import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getLpContract,
  getCakeContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getSouschefContract,
  getClaimRefundContract,
  getTradingCompetitionContract,
  getChronostoneContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useLP = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getLpContract(address, web3), [address, web3])
}

export const useCake = () => {
  const web3 = useWeb3()
  return useMemo(() => getCakeContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useTradingCompetitionContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getTradingCompetitionContract(web3), [web3])
}

export const useChronostoneContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getChronostoneContract(web3), [web3])
}
