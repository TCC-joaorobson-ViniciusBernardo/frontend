import React from 'react';
import { createSlice } from '@reduxjs/toolkit';
import DefaultActions from './DefaultActions';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    open: false,
    title: '',
    content: {
      props: {},
      component: null
    },
    actions: {
      props: {},
      component: (<DefaultActions />)
    },
  },
  reducers: {
    openModal: (state, action) => {
      state.open = true;
      state.title = action.payload.title;
      state.content = action.payload.content || state.content;
      state.actions = action.payload.actions || state.actions;
    },
    closeModal: (state) => {
      state.open = false;
      state.title = '';
      state.content = { props: {}, component: null };
      state.actions = { props: {}, component: (<DefaultActions />) };
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions

export default modalSlice.reducer