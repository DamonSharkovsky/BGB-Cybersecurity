import apiClient from '@/api/apiClient'

export const toolProvider = {
  scanUrl: (url) => apiClient.post('/api/scan', { url }),
  analyzeThreat: (question) => apiClient.post('/api/ai/analyze', { question }),
}
