import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/hospitals`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getHospitals = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getNearbyHospitals = async (latitude, longitude, suggestedDepartment, priorityLevel) => {
  const response = await api.post('/nearby', {
    latitude,
    longitude,
    suggestedDepartment,
    priorityLevel
  });
  return response.data;
};
