import { configureStore } from '@reduxjs/toolkit';
import experimentReducer from './pages/experiment/reducers/experimentSlice';
import experimentFiltersSlice from './pages/experiment/reducers/experimentFiltersSlice';
import modalSlice from './components/modal/modalSlice';

export default configureStore({
  reducer: {
    modal: modalSlice,
    experiment: experimentReducer,
    experimentFilters: experimentFiltersSlice,
  },
});