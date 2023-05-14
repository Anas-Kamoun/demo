import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
  // headers: {
  //   "Access-Control-Allow-Origin": "192.168.1.112:300",
  //   "Access-Control-Allow-Methods": "*",
  //   "Access-Control-Allow-Headers": "*",
  // },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
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
        localStorage.removeItem('ACCESS_TOKEN');
      }
    } catch (e) {}
    throw error;
  }
);

export default axiosClient;
