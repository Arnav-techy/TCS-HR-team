import api from './api';

export const aiService = {
  getRecommendation: async (employeeId) => {
    const response = await api.post('/ai/recommend', { employeeId });
    return response.data;
  },

  rankAll: async () => {
    const response = await api.post('/ai/rank-all');
    return response.data;
  },

  bulkRecommend: async (employeeIds) => {
    const response = await api.post('/ai/bulk-recommend', { employeeIds });
    return response.data;
  },
};
