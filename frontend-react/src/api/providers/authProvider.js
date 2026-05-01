import apiClient from '@/api/apiClient'

export const authProvider = {
  login: (email, password) => apiClient.post('/api/auth/login', { email, password }),
  signup: (userData) => apiClient.post('/api/auth/register', userData),
}
