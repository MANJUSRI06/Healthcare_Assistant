import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/appointments`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// If there's a token, attach it
api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const analyzeSymptoms = async (symptoms) => {
  const response = await api.post('/analyze', { symptoms });
  return response.data;
};

export const bookAppointment = async (data) => {
  const response = await api.post('/book', data);
  return response.data;
};

export const getAppointment = async (id) => {
  const response = await api.get(`/${id}`);
  return response.data;
};

export const getUserAppointments = async (userId) => {
  const response = await api.get(`/user/${userId}`);
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await api.patch(`/${id}/cancel`);
  return response.data;
};
