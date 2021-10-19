import { createSlice } from '@reduxjs/toolkit';

export const experimentSlice = createSlice({
  name: 'experiment',
  initialState: {
    total: 0,
    hasMore: false,
    isLoading: false,
    experimentList: [],
  },
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    finishFetching: (state, action) => {
      state.isLoading = false;
      state.experimentList = action.payload.items;
      state.total = action.payload.total;
    },
    reset: (state) => {
      state.experimentList = [];
    },
  },
})

export const { startFetching, finishFetching, reset } = experimentSlice.actions

export default experimentSlice.reducer