import { configureStore } from '@reduxjs/toolkit';
import mathModelReducer from './pages/math_model/reducers/mathModelSlice';
import mathModelFiltersSlice from './pages/math_model/reducers/mathModelFiltersSlice';
import modalSlice from './components/modal/modalSlice';

export default configureStore({
  reducer: {
    modal: modalSlice,
    mathModel: mathModelReducer,
    mathModelFilters: mathModelFiltersSlice,
  },
});