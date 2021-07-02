import { useEffect, useState } from 'react'
import { getMasterchefContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import useRefresh from './useRefresh'

const useGetThoPPerBlock = () => {
  const [thoPPerBlock, setthoPPerBlock] = useState(new BigNumber(0))
  const { slowRefresh } = useRefresh()

  useEffect(() => {
    const fetchThoPPerBlock = async () => {
      const masterChefContract = getMasterchefContract()
      const rawThoPPerBlock = await masterChefContract.methods.cakePerBlock().call()
      const _thoPPerBlock = new BigNumber(rawThoPPerBlock)
      setthoPPerBlock(_thoPPerBlock)
    }
    fetchThoPPerBlock()
  }, [slowRefresh])

  return thoPPerBlock
}

export default useGetThoPPerBlock
