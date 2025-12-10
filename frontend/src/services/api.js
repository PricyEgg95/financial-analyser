import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const transactionAPI = {
  getAll: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.type) params.append('type', filters.type);
    if (filters.category) params.append('category', filters.category);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    
    const queryString = params.toString();
    return api.get(`/transactions${queryString ? `?${queryString}` : ''}`);
  },
  
  getById: (id) => api.get(`/transactions/${id}`),
  
  create: (data) => api.post('/transactions', data),
  
  update: (id, data) => api.put(`/transactions/${id}`, data),
  
  delete: (id) => api.delete(`/transactions/${id}`),
};

export const analyticsAPI = {
  getSummary: () => api.get('/analytics/summary'),
  
  getCategoryBreakdown: () => api.get('/analytics/category-breakdown'),
  
  getMonthlyTrends: () => api.get('/analytics/monthly-trends'),
  
  getRecentTransactions: (limit = 5) => 
    api.get(`/analytics/recent?limit=${limit}`),
};

export default api;
