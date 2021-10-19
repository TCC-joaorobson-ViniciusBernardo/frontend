import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startFetching, finishFetching } from './reducers/experimentSlice';
import axios from '../../axiosInstance';
import ExperimentCard from './components/ExperimentCard';
import ExperimentFilters from './components/ExperimentFilters';
import ExperimentPagination from './components/ExperimentPagination';
import ENDPOINTS from '../../config/api_endpoints';
import { Divider, CircularProgress } from '@mui/material';
import { FlexDiv } from './styles';

const ExperimentsPage = () => {
  const experimentReducer = useSelector((state) => state.experiment)
  const experimentFilters = useSelector((state) => state.experimentFilters)
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [experimentFilters]);

  const getData = () => {
    dispatch(startFetching());
    axios
      .get(ENDPOINTS.experiments, {
        params: { ...experimentFilters, experiment_id: 0 },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }

  return(
    <FlexDiv width='100%' flexDirection='column' padding='16px' height='calc(100% - 64px)'>
      <ExperimentFilters />
      <FlexDiv
        overflow='auto'
        flexBasis='80%'
        flexDirection='column'
        alignItems={experimentReducer.isLoading ? 'center' : 'initial'}
        justifyContent={experimentReducer.isLoading ? 'center' : 'initial'}
      >
        {experimentReducer.isLoading ?
          <CircularProgress /> :
          experimentReducer.experimentList.map((experiment, index) => {
            return(
              <div key={index}>
                <ExperimentCard experiment={experiment} />
                {index < (experimentReducer.experimentList.length - 1) && <Divider />}
              </div>
            );
          })}
      </FlexDiv>
      <ExperimentPagination />
    </FlexDiv>
  );
}

export default ExperimentsPage;