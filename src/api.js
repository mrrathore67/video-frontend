import axios from 'axios';

const API = axios.create({
  baseURL: "https://video-backend-yhsv.onrender.com/api",
  withCredentials: true,
});

// Automatically attach token to headers
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`; 
  }
  return req; 
});

export default API;
