import apiClient from '@/api/apiClient'

export const homeProvider = {
  getDashboardData: () => apiClient.get('/api/home/dashboard'),
  getAreas: () => apiClient.get('/api/areas'),
}
