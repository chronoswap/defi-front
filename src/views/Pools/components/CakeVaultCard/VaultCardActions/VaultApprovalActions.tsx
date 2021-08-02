import React from 'react'
import { Button, AutoRenewIcon, Skeleton } from '@chronoswap-packages/uikit'
import useI18n from 'hooks/useI18n'
import { useVaultApprove } from '../../../hooks/useApprove'

interface ApprovalActionProps {
  setLastUpdated: () => void
  isLoading?: boolean
}

const VaultApprovalAction: React.FC<ApprovalActionProps> = ({ isLoading = false }) => {
  const TranslateString = useI18n()

  const { handleApprove, requestedApproval } = useVaultApprove()

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="52px" />
      ) : (
        <Button
          isLoading={requestedApproval}
          endIcon={requestedApproval ? <AutoRenewIcon spin color="currentColor" /> : null}
          disabled={requestedApproval}
          onClick={handleApprove}
          width="100%"
        >
          {TranslateString(387, 'Enable')}
        </Button>
      )}
    </>
  )
}

export default VaultApprovalAction
