import React from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import DatePicker from '@mui/lab/DatePicker';
import { selectEndDate, selectStartDate } from "../reducers/sandboxFiltersSlice";
import moment from "moment";
import 'moment/locale/pt-br';

const RangeFilter = () => {
  const sandboxFilters = useSelector((state) => state.sandboxFilters)
  const dispatch = useDispatch();

  return(
    <>
      <DatePicker
        label="Data de Início"
        value={sandboxFilters.start_date}
        onChange={(newValue) => {
          dispatch(
            selectStartDate(
              moment(newValue).startOf('day').format('YYYY-MM-DD HH:mm:ss')
            )
          );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      <DatePicker
        label="Data Final"
        value={sandboxFilters.end_date}
        onChange={(newValue) => {
          dispatch(
            selectEndDate(
              moment(newValue).endOf('day').format('YYYY-MM-DD HH:mm:ss')
            )
          );
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </>
  );
}

export default RangeFilter;