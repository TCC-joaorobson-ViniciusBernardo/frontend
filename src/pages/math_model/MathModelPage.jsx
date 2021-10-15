import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startFetching, finishFetching } from './reducers/mathModelSlice';
import axios from '../../axiosInstance';
import MathModelCard from './components/MathModelCard';
import ENDPOINTS from '../../config/api_endpoints';
import { Divider } from '@mui/material';

const MathModelPage = () => {
  const mathModelReducer = useSelector((state) => state.mathModel)
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(startFetching());
    axios
      .get(ENDPOINTS.experiments, {
        params: { experiment_id: 0 },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }

  return(
    <div style={{ width: '100%' }}>
      <h1>Modelos</h1>
      {mathModelReducer.mathModelList.map((mathModel, index) => {
        return(
          <div key={index}>
            <MathModelCard mathModel={mathModel} />
            {index < (mathModelReducer.mathModelList.length - 1) && <Divider />}
          </div>
        );
      })}
    </div>
  );
}

export default MathModelPage;