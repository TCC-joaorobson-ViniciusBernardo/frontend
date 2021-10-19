import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';
import { FlexDiv } from '../styles';
import { changePage } from '../reducers/experimentFiltersSlice';

const ExperimentPagination = () => {
  const experimentReducer = useSelector((state) => state.experiment)
  const dispatch = useDispatch();

  return(
    <FlexDiv margin='16px 0px' flexDirection='row' justifyContent='space-evenly' flexBasis='10%' alignItems='flex-end'>
      <Pagination count={Math.ceil(experimentReducer.total/10)} onChange={(e, page) => dispatch(changePage(page))} />
    </FlexDiv>
  );
}

export default ExperimentPagination;