import { configureStore } from '@reduxjs/toolkit';
import experimentReducer from './pages/experiment/reducers/experimentSlice';
import experimentFiltersSlice from './pages/experiment/reducers/experimentFiltersSlice';
import modalSlice from './components/modal/modalSlice';
import sandboxSlice from './pages/sandbox/reducers/sandboxSlice';
import sandboxFiltersSlice from './pages/sandbox/reducers/sandboxFiltersSlice';

export default configureStore({
  reducer: {
    modal: modalSlice,
    experiment: experimentReducer,
    experimentFilters: experimentFiltersSlice,
    sandbox: sandboxSlice,
    sandboxFilters: sandboxFiltersSlice,
  },
});