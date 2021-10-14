import { configureStore } from '@reduxjs/toolkit';
import mathModelReducer from './pages/math_model/reducers/mathModelSlice';

export default configureStore({
  reducer: {
    mathModel: mathModelReducer,
  },
});