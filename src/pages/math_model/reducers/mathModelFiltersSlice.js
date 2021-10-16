import { createSlice } from '@reduxjs/toolkit';

export const mathModelFiltersSlice = createSlice({
  name: 'mathModelFilters',
  initialState: {
    page: 1,
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
} = mathModelFiltersSlice.actions

export default mathModelFiltersSlice.reducer