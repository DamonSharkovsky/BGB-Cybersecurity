class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl || 'http://localhost:5501';
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        const config = {
            ...options,
            headers,
        };

        try {
            const response = await fetch(url, config);
            let data;
            try {
                data = await response.json();
            } catch (e) {
                data = null;
            }

            if (!response.ok) {
                // Handle Pydantic validation errors or other structured errors
                let errorMessage = response.statusText;
                if (data) {
                    if (Array.isArray(data)) {
                        errorMessage = data.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ');
                    } else if (data.error) {
                        errorMessage = data.error;
                    } else if (data.message) {
                        errorMessage = data.message;
                    }
                }
                return Promise.reject(errorMessage);
            }

            return data;
        } catch (error) {
            console.error('API Request Error:', error);
            return Promise.reject(error);
        }
    }

    get(endpoint, options = {}) {
        return this.request(endpoint, { ...options, method: 'GET' });
    }

    post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            ...options,
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
}

const apiClient = new ApiClient();
export default apiClient;
