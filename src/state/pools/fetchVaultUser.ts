import BigNumber from 'bignumber.js'
import { getThopVaultContract } from 'utils/contractHelpers'

const thopVaultContract = getThopVaultContract()

const fetchVaultUser = async (account: string) => {
  try {
    const userContractResponse = await thopVaultContract.methods.userInfo(account)
    return {
      isLoading: false,
      userShares: new BigNumber(userContractResponse.shares.toString()).toJSON(),
      lastDepositedTime: userContractResponse.lastDepositedTime.toString(),
      lastUserActionTime: userContractResponse.lastUserActionTime.toString(),
      thopAtLastUserAction: new BigNumber(userContractResponse.thopAtLastUserAction.toString()).toJSON(),
    }
  } catch (error) {
    return {
      isLoading: true,
      userShares: null,
      lastDepositedTime: null,
      lastUserActionTime: null,
      thopAtLastUserAction: null,
    }
  }
}

export default fetchVaultUser
