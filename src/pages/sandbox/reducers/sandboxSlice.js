import { createSlice } from '@reduxjs/toolkit';
import moment from "moment";
import 'moment/locale/pt-br';

export const sandboxSlice = createSlice({
  name: 'sanbox',
  initialState: {
    min: null,
    max: null,
    consumptions: [],
    isLoading: false,
  },
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    finishFetching: (state, action) => {
      state.isLoading = false;
      state.experimentList = action.payload.items;
      state.consumptions = action.payload?.consumption?.map(
        (x, index) => ({
          id: index,
          date: x[0],
          consumption: typeof x[1] === 'number' ? Number(x[1].toFixed(2)) : x[1],
          dayOfWeek: moment(x[0]).format('dddd'),
          hourOfDay: moment(x[0]).format('HH')
        })
      );
      state.min = action.payload.min;
      state.max = action.payload.max;
    },
    reset: (state) => {
      state.consumptions = [];
    },
  },
})

export const { startFetching, finishFetching, reset } = sandboxSlice.actions

export default sandboxSlice.reducer