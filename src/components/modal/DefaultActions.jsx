import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';

const DefaultActions = () => {
  const dispatch = useDispatch();

  return(
    <Button onClick={() => dispatch(closeModal())}>Fechar</Button>
  );
}

export default DefaultActions;