import api from './api';

export const authService = {
  signup: async (data) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  login: async (data) => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },
};
