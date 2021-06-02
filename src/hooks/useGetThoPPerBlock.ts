import { useEffect, useState } from 'react'
import { getMasterchefContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import useRefresh from './useRefresh'

const useGetThoPPerBlock = () => {
  const [thoPPerBlock, setthoPPerBlock] = useState(0)
  const { slowRefresh } = useRefresh()
  const masterChefContract = getMasterchefContract()

  useEffect(() => {
    const fetchThoPPerBlock = async () => {
      const rawThoPPerBlock = await masterChefContract.methods.cakePerBlock().call()
      const _thoPPerBlock = new BigNumber(rawThoPPerBlock).div(10**18) // TODO No me gusta meter datos a piñone
      setthoPPerBlock(_thoPPerBlock.toNumber())
    }
    fetchThoPPerBlock()
  }, [slowRefresh, masterChefContract])

  return thoPPerBlock
}

export default useGetThoPPerBlock
