import axios from 'axios';

const axiosApi = axios.create({ baseURL: process.env.REACT_APP_API_HOST });

const axiosSige = axios.create({ baseURL: process.env.REACT_APP_SIGE_HOST });

export { axiosApi, axiosSige };