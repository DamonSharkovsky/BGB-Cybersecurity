import apiClient from '../apiClient.js';

class HomeProvider {
    async getDashboardData() {
        return apiClient.get('/api/home/dashboard');
    }

    async getAreas() {
        return apiClient.get('/api/areas');
    }
}

export default new HomeProvider();
