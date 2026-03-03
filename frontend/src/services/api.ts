// Mock API service - replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

interface RequestOptions {
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
}

const api = {
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<{ data: T }> {
    const headers: Record<string, string> = {
      ...options?.headers,
    };

    // Don't set Content-Type for FormData (browser will set it with boundary)
    if (!(data instanceof FormData)) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: data instanceof FormData ? data : JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw { response: { data: error } };
    }

    if (options?.responseType === 'blob') {
      const blob = await response.blob();
      return { data: blob as T };
    }

    const json = await response.json();
    return { data: json };
  },

  async get<T>(endpoint: string): Promise<{ data: T }> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Request failed' }));
      throw { response: { data: error } };
    }

    const json = await response.json();
    return { data: json };
  },
};

export default api;
