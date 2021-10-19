import { createSlice } from '@reduxjs/toolkit';

export const experimentFiltersSlice = createSlice({
  name: 'experimentFilters',
  initialState: {
    page: 1,
    size: 10,
    status: [],
    modelType: [],
    experimentName: null,
  },
  reducers: {
    changePage: (state, action) => {
      state.page = action.payload;
    },
    searchExperiment: (state, action) => {
      state.page = 1;
      state.experimentName = action.payload;
    },
    selectStatus: (state, action) => {
      state.page = 1;
      state.status = action.payload;
    },
    selectModelType: (state, action) => {
      state.page = 1;
      state.modelType = action.payload;
    },
    reset: (state) => {
      state.page = 1;
      state.status = [];
      state.modelType = [];
      state.experimentName = null;
    },
  },
})

export const {
  changePage,
  searchExperiment,
  selectStatus,
  selectModelType,
  reset
} = experimentFiltersSlice.actions

export default experimentFiltersSlice.reducer