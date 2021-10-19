import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from '@mui/material';
import { FlexDiv } from '../styles';
import { changePage } from '../reducers/mathModelFiltersSlice';

const MathModelPagination = () => {
  const mathModelReducer = useSelector((state) => state.mathModel)
  const dispatch = useDispatch();

  return(
    <FlexDiv margin='16px 0px' flexDirection='row' justifyContent='space-evenly' flexBasis='10%' alignItems='flex-end'>
      <Pagination count={Math.ceil(mathModelReducer.total/10)} onChange={(e, page) => dispatch(changePage(page))} />
    </FlexDiv>
  );
}

export default MathModelPagination;