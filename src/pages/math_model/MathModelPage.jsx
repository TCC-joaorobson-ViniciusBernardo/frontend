import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { startFetching, finishFetching } from './reducers/mathModelSlice';
import axios from '../../axiosInstance';
import { Divider, Chip } from '@mui/material';

const MathModelPage = () => {
  const mathModelReducer = useSelector((state) => state.mathModel)
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(startFetching());
    axios
      .get('/experiments', {
        params: { experiment_id: 0 },
      })
      .then((response) => {
        dispatch(finishFetching(response.data));
      })
      .catch(error => {
        console.error(error);
      })
  }

  const getChipColor = (label) => {
    let color = null;

    switch (label) {
      case 'FINISHED':
        color = 'success';
        break;

      case 'FAILED':
        color = 'error';
        break;

      default:
        color = 'info';
        break;
    }

    return color;
  }

  return(
    <div style={{ width: '100%' }}>
      <h1>Modelos</h1>
      {mathModelReducer.mathModelList.map((mathModel, index) => {
        return(
          <div key={index}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>
                  {mathModel?.info?.experiment_id}
                </p>
                {new Date(mathModel?.info?.start_time).toString()}
              </div>
              <p>
                {mathModel?.info?.run_id}
              </p>
              <p>
                <Chip
                  label={mathModel?.info?.status}
                  variant="outlined"
                  color={getChipColor(mathModel?.info?.status)}
                  size="small"
                />
              </p>
            </div>
            {index < (mathModelReducer.mathModelList.length - 1) && <Divider />}
          </div>
        );
      })}
    </div>
  );
}

export default MathModelPage;