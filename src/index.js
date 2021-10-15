import React from 'react';
import ReactDOM from 'react-dom';
import { Chart } from 'react-chartjs-2';
import StreamingPlugin from 'chartjs-plugin-streaming';
import 'chartjs-adapter-luxon';
import { Provider } from 'react-redux';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './Router';
import store from './store';
import Modal from './components/modal/Modal';

Chart.register(StreamingPlugin);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
      <Modal />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
