import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { FlexDiv } from '../experiment/styles';
import { axiosSige } from '../../axiosInstance';
import { startFetching, finishFetching } from './reducers/sandboxSlice';
import SIGE_ENDPOINTS from '../../config/sige_endpoints';
import SandboxFilters from './components/SandboxFilters';
import SandboxAnalytics from './components/SandboxAnalytics';
import moment from "moment";
import 'moment/locale/pt-br';

const SandboxPage = () => {
  const sandboxReducer = useSelector((state) => state.sandbox)
  const sandboxFiltersReducer = useSelector((state) => state.sandboxFilters)
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [sandboxFiltersReducer]);

  const getData = () => {
    dispatch(startFetching());
    axiosSige
      .get(SIGE_ENDPOINTS.graphQuarterlyConsumption, {
        params: { ...sandboxFiltersReducer },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }

  const columns = [
    {
      field: 'date',
      headerName: 'Data e Hora',
      width: 300,
      valueFormatter: (params) => (
        `${moment(params.value).format('DD/MM/YYYY HH:mm:ss')}`
      )
    },
    { field: 'consumption', headerName: 'Consumo (Wh)', width: 300 },
  ];

  return(
    <FlexDiv height='calc(100% - 64px)'>
      <FlexDiv flexBasis='50%' padding='16px 8px 16px 16px'  flexDirection='column'>
        <SandboxFilters />
        <DataGrid
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          rows={sandboxReducer.consumptions}
        />
      </FlexDiv>
      <FlexDiv flexBasis='50%' padding='16px 16px 16px 8px'>
        <SandboxAnalytics />
      </FlexDiv>
    </FlexDiv>
  );
}

export default SandboxPage;