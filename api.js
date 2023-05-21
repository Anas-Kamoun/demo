import axios from 'axios';
import axiosClient from './axios';

const api = axiosClient.create({
  baseURL: `http://localhost:8000/api`, // Remplacez avec votre URL réelle
});

export default api;
