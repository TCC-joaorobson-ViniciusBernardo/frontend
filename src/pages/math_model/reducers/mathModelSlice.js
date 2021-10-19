import { createSlice } from '@reduxjs/toolkit';

export const mathModelSlice = createSlice({
  name: 'mathModel',
  initialState: {
    total: 0,
    hasMore: false,
    isLoading: false,
    mathModelList: [],
  },
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    finishFetching: (state, action) => {
      state.isLoading = false;
      state.mathModelList = action.payload.items;
      state.total = action.payload.total;
    },
    reset: (state) => {
      state.mathModelList = [];
    },
  },
})

export const { startFetching, finishFetching, reset } = mathModelSlice.actions

export default mathModelSlice.reducer