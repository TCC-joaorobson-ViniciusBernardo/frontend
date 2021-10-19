import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startFetching, finishFetching } from './reducers/mathModelSlice';
import axios from '../../axiosInstance';
import MathModelCard from './components/MathModelCard';
import MathModelFilters from './components/MathModelFilters';
import MathModelPagination from './components/MathModelPagination';
import ENDPOINTS from '../../config/api_endpoints';
import { Divider } from '@mui/material';
import { FlexDiv } from './styles';

const MathModelPage = () => {
  const mathModelReducer = useSelector((state) => state.mathModel)
  const mathModelFilters = useSelector((state) => state.mathModelFilters)
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [mathModelFilters]);

  const getData = () => {
    dispatch(startFetching());
    axios
      .get(ENDPOINTS.experiments, {
        params: { ...mathModelFilters, experiment_id: 0 },
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
      <MathModelFilters />
      <FlexDiv flexDirection='column' flexBasis='80%' overflow='auto'>
        {mathModelReducer.mathModelList.map((mathModel, index) => {
          return(
            <div key={index}>
              <MathModelCard mathModel={mathModel} />
              {index < (mathModelReducer.mathModelList.length - 1) && <Divider />}
            </div>
          );
        })}
      </FlexDiv>
      <MathModelPagination />
    </FlexDiv>
  );
}

export default MathModelPage;