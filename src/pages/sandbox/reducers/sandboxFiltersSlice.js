import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";
import 'moment/locale/pt-br';

export const sandboxFiltersSlice = createSlice({
  name: 'sanboxFilters',
  initialState: {
    id: 1,
    start_date: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
    end_date: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    type: 'hourly',
  },
  reducers: {
    changeTransductor: (state, action) => {
      state.id = action.payload;
    },
    selectStartDate: (state, action) => {
      state.start_date = action.payload;
    },
    selectEndDate: (state, action) => {
      state.end_date = action.payload;
    },
    reset: (state) => {
      state.id = 1;
      state.start_date = new Date();
      state.end_date = new Date();
    },
  },
})

export const {
  changeTransductor,
  selectStartDate,
  selectEndDate,
  reset
} = sandboxFiltersSlice.actions

export default sandboxFiltersSlice.reducer