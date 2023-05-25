import axios from "axios";
import axiosClient from "./axios";

const api = axiosClient.create({
  baseURL: `https://back-end-grh.alwaysdata.net/api`, // Remplacez avec votre URL réelle
});

export default api;
