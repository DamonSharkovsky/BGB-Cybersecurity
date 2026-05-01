import apiClient from '../apiClient.js';

class AIProvider {
    async analyzeThreat(question) {
        return apiClient.post('/api/ai/analyze', { question });
    }
}

export default new AIProvider();
