import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { useFarmFromPid } from 'state/hooks'
import { useLP } from 'hooks/useContract'
import { getAddress, getMasterChefAddress } from 'utils/addressHelpers'
import useRefresh from './useRefresh'

const useFarmStakedPrice = (pid, farmLiquidity) => {
  const [farmStakedPrice, setFarmStakedPrice] = useState({farmStakedPrice: 0.0, farmLpPrice: 0.0})
  const { account } = useWeb3React()
  const { fastRefresh } = useRefresh()
  const farm = useFarmFromPid(pid)

  const lpContract = useLP(getAddress(farm.lpAddresses))
  useEffect(() => {
    const fetchStaked = async () => {
      const rawlpSupply = await lpContract.methods.balanceOf(getMasterChefAddress()).call()
      const lpSupply = new BigNumber(rawlpSupply).div(10**farm.token.decimals)
      const lpPrice = farmLiquidity?farmLiquidity.div(lpSupply):new BigNumber(0)
      const stakedBalance = new BigNumber(farm.userData?farm.userData.stakedBalance:0).div(10**farm.token.decimals)
      const stakedBalancePrice = stakedBalance.times(lpPrice)
      setFarmStakedPrice({farmStakedPrice: stakedBalancePrice.toNumber(), farmLpPrice: lpPrice.toNumber()})
    }

    if (account) {
      fetchStaked()
    }
  }, [account, farm, lpContract, farmLiquidity, fastRefresh])

  return farmStakedPrice
}

export default useFarmStakedPrice
