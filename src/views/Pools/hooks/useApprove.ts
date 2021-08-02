import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useSousApprove, useApprove } from 'hooks/useApprove'
import { useCake, useThopVaultContract } from 'hooks/useContract'
import useLastUpdated from 'hooks/useLastUpdated'
import { getThopVaultAddress } from 'utils/addressHelpers'

export const useApprovePool = (lpContract, sousId) => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const { onApprove } = useSousApprove(lpContract, sousId)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return { handleApprove, requestedApproval }
}

// Approve CAKE auto pool
export const useVaultApprove = () => {
  const [requestedApproval, setRequestedApproval] = useState(false)
  const cakeContract = useCake()
  const { onApprove } = useApprove(cakeContract)

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  return { handleApprove, requestedApproval }
}

export const useCheckVaultApprovalStatus = () => {
  const [isVaultApproved, setIsVaultApproved] = useState(false)
  const { account } = useWeb3React()
  const cakeContract = useCake()
  const thopVaultContract = useThopVaultContract()
  const { lastUpdated, setLastUpdated } = useLastUpdated()
  useEffect(() => {
    const checkApprovalStatus = async () => {
      try {
        const response = await cakeContract.methods.allowance(account, getThopVaultAddress()).call()
        const currentAllowance = new BigNumber(response.toString())
        setIsVaultApproved(currentAllowance.gt(0))
      } catch (error) {
        setIsVaultApproved(false)
      }
    }

    checkApprovalStatus()
  }, [account, cakeContract, thopVaultContract, lastUpdated])

  return { isVaultApproved, setLastUpdated }
}
