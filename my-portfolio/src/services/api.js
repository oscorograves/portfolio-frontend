// API configuration
// In development: uses Vite proxy if VITE_API_URL is not set
// In production: uses VITE_API_URL environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Generic API request function
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_URL}/api${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || `HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API request error:', error);
    throw error;
  }
}

/**
 * Contact Form API
 */
export const contactAPI = {
  send: async (formData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  },
};

/**
 * Metrics API
 */
export const metricsAPI = {
  getAll: async () => {
    return apiRequest('/metrics');
  },
  getByChannel: async (channel) => {
    return apiRequest(`/metrics/${channel}`);
  },
};

/**
 * Case Studies API
 */
export const caseStudiesAPI = {
  getAll: async () => {
    return apiRequest('/case-studies');
  },
  getById: async (id) => {
    return apiRequest(`/case-studies/${id}`);
  },
};

/**
 * Health Check API
 */
export const healthAPI = {
  check: async () => {
    return apiRequest('/health');
  },
};
