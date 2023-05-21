import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api",
});

axiosClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('ACCESS_TOKEN');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    try {
      const { response } = error;
      if (response.status === 401) {
        AsyncStorage.removeItem('ACCESS_TOKEN');
      }
    } catch (e) {}
    throw error;
  }
);

export default axiosClient;
