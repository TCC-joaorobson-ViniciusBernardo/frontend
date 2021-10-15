import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from './modalSlice';

const Modal = () => {
  const modalReducer = useSelector((state) => state.modal)
  const dispatch = useDispatch();

  return(
    <Dialog
      open={modalReducer.open}
      onClose={() => dispatch(closeModal())}
    >
      <DialogTitle>
        {modalReducer.title}
      </DialogTitle>
      <DialogContent {...modalReducer.content.props}>
        {modalReducer.content.component}
      </DialogContent>
      <DialogActions {...modalReducer.actions.props}>
        {modalReducer.actions.component}
      </DialogActions>
    </Dialog>
  );
}

export default Modal;