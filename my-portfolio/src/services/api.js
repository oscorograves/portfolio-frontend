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
 * Google Sheets Data Configuration
 * Fetches live metrics from published CSV
 */
const SHEET_ID = '2PACX-1vTDn-lJIO3TJJ1TQLIFIbFLYzGo-nYZUv0ID45PnaV-OqqrH8GvU88k-Fvd117bCOKZNcsRH_l79FPd';
const CSV_URL = `https://docs.google.com/spreadsheets/d/e/${SHEET_ID}/pub?output=csv`;

/**
 * Helper: Parse CSV to JSON
 * Assumes first row is header
 */
const parseCSV = (csvText) => {
  const lines = csvText.split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

  return lines.slice(1).map(line => {
    // Handle quotes values if needed, but for simple numbers/text simple split suffices
    // For robust CSV parsing we might need regex, but let's start simple
    const values = line.split(',');

    const entry = {};
    headers.forEach((header, index) => {
      let value = values[index] ? values[index].trim() : '';

      // Clean up common currency/percentage symbols for numbers
      if (header === 'spend' || header === 'cpl' || header === 'roi' || header === 'ctr' || header === 'cvr') {
        const num = parseFloat(value.replace(/[$%,]/g, ''));
        if (!isNaN(num)) {
          value = num;
        }
      }
      entry[header] = value;
    });
    return entry;
  }).filter(row => row.client); // Filter empty rows
};

/**
 * Metrics API with Google Sheets Integration
 */
export const metricsAPI = {
  getAll: async () => {
    try {
      const response = await fetch(CSV_URL);
      const text = await response.text();
      const metrics = parseCSV(text);

      // Calculate summary stats
      const totalSpend = metrics.reduce((sum, m) => sum + (m.spend || 0), 0);
      const avgCTR = metrics.length ? metrics.reduce((sum, m) => sum + (m.ctr || 0), 0) / metrics.length : 0;
      const avgCVR = metrics.length ? metrics.reduce((sum, m) => sum + (m.cvr || 0), 0) / metrics.length : 0;
      const avgROI = metrics.length ? metrics.reduce((sum, m) => sum + (m.roi || 0), 0) / metrics.length : 0;

      return {
        metrics,
        summary: { totalSpend, avgCTR, avgCVR, avgROI }
      };
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
  },

  getByChannel: async (channel) => {
    try {
      const allData = await metricsAPI.getAll();
      const filtered = allData.metrics.filter(m => m.channel && m.channel.toLowerCase() === channel.toLowerCase());

      // Recalculate summary for filtered data
      const totalSpend = filtered.reduce((sum, m) => sum + (m.spend || 0), 0);
      const avgCTR = filtered.length ? filtered.reduce((sum, m) => sum + (m.ctr || 0), 0) / filtered.length : 0;
      const avgCVR = filtered.length ? filtered.reduce((sum, m) => sum + (m.cvr || 0), 0) / filtered.length : 0;
      const avgROI = filtered.length ? filtered.reduce((sum, m) => sum + (m.roi || 0), 0) / filtered.length : 0;

      return {
        metrics: filtered,
        summary: { totalSpend, avgCTR, avgCVR, avgROI }
      };
    } catch (error) {
      console.error('Error fetching sheet data:', error);
      throw error;
    }
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
