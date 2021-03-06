import { createSlice } from '@reduxjs/toolkit';

export const realTimeChartSlice = createSlice({
  name: 'realTimeChart',
  initialState: {
    labels: [],
    data: [],
    predictions: [],
  },
  reducers: {
    updateChartValues: (state, action) => {
      state.labels = [...action.payload.labels];
      state.data = [...action.payload.data];
      state.predictions = [...action.payload.predictions];
    },
  },
})

export const { updateChartValues } = realTimeChartSlice.actions

export default realTimeChartSlice.reducer