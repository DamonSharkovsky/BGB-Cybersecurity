class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || 'http://127.0.0.1:5501'
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`
    
    // Automatic Authorization Header Injection
    const token = localStorage.getItem('token') || sessionStorage.getItem('token')
    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      ...options.headers,
    }

    const config = {
      ...options,
      headers,
    }

    try {
      const response = await fetch(url, config)
      let data
      try {
        data = await response.json()
      } catch (e) {
        data = null
      }

      if (!response.ok) {
        // Standardized error catching for Pydantic and API errors
        let error = {
          status: response.status,
          message: response.statusText,
          details: data,
        }

        if (data) {
          if (Array.isArray(data)) {
            // Flatten Pydantic validation errors
            error.message = data.map((err) => `${err.loc.join('.')}: ${err.msg}`).join(', ')
          } else if (data.error) {
            error.message = data.error
          } else if (data.message) {
            error.message = data.message
          }
        }

        throw error
      }

      return data
    } catch (error) {
      // Normalize network errors
      if (!error.status) {
        console.error('Network/System Error:', error)
        throw { status: 0, message: 'Server unreachable or network error', details: error }
      }
      throw error
    }
  }

  get(endpoint, options = {}) {
    return this.request(endpoint, { ...options, method: 'GET' })
  }

  post(endpoint, data, options = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

const apiClient = new ApiClient()
export default apiClient
