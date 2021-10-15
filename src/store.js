import { configureStore } from '@reduxjs/toolkit';
import mathModelReducer from './pages/math_model/reducers/mathModelSlice';
import modalSlice from './components/modal/modalSlice';

export default configureStore({
  reducer: {
    mathModel: mathModelReducer,
    modal: modalSlice,
  },
});