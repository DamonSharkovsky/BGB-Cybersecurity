import apiClient from '../apiClient.js';

class ScannerProvider {
    async scanUrl(url) {
        return apiClient.post('/api/scan', { url });
    }
}

export default new ScannerProvider();
