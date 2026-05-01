import apiClient from '../apiClient.js';

class AuthProvider {
    async login(email, password) {
        return apiClient.post('/api/auth/login', { email, password });
    }

    async signup(userData) {
        return apiClient.post('/api/auth/register', userData);
    }
}

export default new AuthProvider();
