/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import stakingsConfig from 'config/constants/stakings'
import { StakingsState, Staking } from 'state/types'
import fetchStakings from './fetchStakings'
import {
  fetchStakingUserEarnings,
  fetchStakingUserAllowances,
  fetchStakingUserTokenBalances,
  fetchStakingUserStakedBalances,
} from './fetchStakingUser'

const initialState: StakingsState = { data: [...stakingsConfig] }

export const stakingsSlice = createSlice({
  name: 'Stakings',
  initialState,
  reducers: {
    setStakingsPublicData: (state, action) => {
      const liveStakingsData: Staking[] = action.payload
      state.data = state.data.map((staking) => {
        const liveStakingData = liveStakingsData.find((s) => s.pid === staking.pid)
        return { ...staking, ...liveStakingData }
      })
    },
    setStakingUserData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload
      arrayOfUserDataObjects.forEach((userDataEl) => {
        const { index } = userDataEl
        state.data[index] = { ...state.data[index], userData: userDataEl }
      })
    },
  },
})

// Actions
export const { setStakingsPublicData, setStakingUserData } = stakingsSlice.actions

// Thunks
export const fetchStakingsPublicDataAsync = () => async (dispatch) => {
  const stakings = await fetchStakings()
  dispatch(setStakingsPublicData(stakings))
}
export const fetchStakingUserDataAsync = (account) => async (dispatch) => {
  const userStakingAllowances = await fetchStakingUserAllowances(account)
  const userStakingTokenBalances = await fetchStakingUserTokenBalances(account)
  const userStakedBalances = await fetchStakingUserStakedBalances(account)
  const userStakingEarnings = await fetchStakingUserEarnings(account)

  const arrayOfUserDataObjects = userStakingAllowances.map((stakingAllowance, index) => {
    return {
      index,
      allowance: userStakingAllowances[index],
      tokenBalance: userStakingTokenBalances[index],
      stakedBalance: userStakedBalances[index],
      earnings: userStakingEarnings[index],
    }
  })

  dispatch(setStakingUserData({ arrayOfUserDataObjects }))
}

export default stakingsSlice.reducer
