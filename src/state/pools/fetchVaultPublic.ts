import BigNumber from 'bignumber.js'
import { convertSharesToThop } from 'views/Pools/helpers'
import thopVaultAbi from 'config/abi/thopVault.json'
import { getThopVaultAddress } from 'utils/addressHelpers'
import multicall from 'utils/multicall'

const BIG_ZERO = new BigNumber(0)

export const fetchPublicVaultData = async () => {
  try {
    const calls = [
      'getPricePerFullShare',
      'totalShares',
      'calculateHarvestThopRewards',
      'calculateTotalPendingThopRewards',
    ].map((method) => ({
      address: getThopVaultAddress(),
      name: method,
    }))

    const [[sharePrice], [shares], [estimatedThopBountyReward], [totalPendingThopHarvest]] = await multicall(
      thopVaultAbi,
      calls,
    )

    const totalSharesAsBigNumber = shares ? new BigNumber(shares.toString()) : BIG_ZERO
    const sharePriceAsBigNumber = sharePrice ? new BigNumber(sharePrice.toString()) : BIG_ZERO
    const totalThopInVaultEstimate = convertSharesToThop(totalSharesAsBigNumber, sharePriceAsBigNumber)
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalThopInVault: totalThopInVaultEstimate.thopAsBigNumber.toJSON(),
      estimatedThopBountyReward: new BigNumber(estimatedThopBountyReward.toString()).toJSON(),
      totalPendingThopHarvest: new BigNumber(totalPendingThopHarvest.toString()).toJSON(),
    }
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalThopInVault: null,
      estimatedThopBountyReward: null,
      totalPendingThopHarvest: null,
    }
  }
}

export const fetchVaultFees = async () => {
  try {
    const calls = ['performanceFee', 'callFee', 'withdrawFee', 'withdrawFeePeriod'].map((method) => ({
      address: getThopVaultAddress(),
      name: method,
    }))

    const [[performanceFee], [callFee], [withdrawalFee], [withdrawalFeePeriod]] = await multicall(thopVaultAbi, calls)

    return {
      performanceFee: performanceFee.toNumber(),
      callFee: callFee.toNumber(),
      withdrawalFee: withdrawalFee.toNumber(),
      withdrawalFeePeriod: withdrawalFeePeriod.toNumber(),
    }
  } catch (error) {
    return {
      performanceFee: null,
      callFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null,
    }
  }
}

export default fetchPublicVaultData
