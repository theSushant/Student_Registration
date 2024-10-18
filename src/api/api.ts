import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const submitRegistration = async (data: any) => {
  return api.post('/register', data);
};
