import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: `${API_URL}/api/doctors`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getDoctors = async () => {
  const response = await api.get('/');
  return response.data;
};

export const getDoctorsByDepartment = async (department) => {
  const response = await api.get(`/department/${department}`);
  return response.data;
};

export const getDoctorsByHospitalAndDept = async (hospitalName, department) => {
  const response = await api.get(`/search`, { params: { hospitalName, department } });
  return response.data;
};

export const getDoctorById = async (doctorId) => {
  const response = await api.get(`/${doctorId}`);
  return response.data;
};
