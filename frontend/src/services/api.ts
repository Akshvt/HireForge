// Mock API service - replace with your actual backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface RequestOptions {
  headers?: Record<string, string>;
  responseType?: 'json' | 'blob';
}

interface ApiService {
  post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<{ data: T }>;
  get<T>(endpoint: string, options?: RequestOptions): Promise<{ data: T }>;
  put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<{ data: T }>;
  delete<T>(endpoint: string, options?: RequestOptions): Promise<{ data: T }>;
}

const api: ApiService = {
  async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<{ data: T }> {
    const { token } = localStorage.getItem('hireforge-auth')
      ? JSON.parse(localStorage.getItem('hireforge-auth')!).state
      : { token: null };

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

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
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      const errorData = {
        message: error.message || error.error || 'Request failed'
      };
      throw { response: { data: errorData } };
    }

    if (options?.responseType === 'blob') {
      const blob = await response.blob();
      return { data: blob as T };
    }

    const json = await response.json();
    return { data: json };
  },

  async get<T>(endpoint: string, options?: RequestOptions): Promise<{ data: T }> {
    const { token } = localStorage.getItem('hireforge-auth')
      ? JSON.parse(localStorage.getItem('hireforge-auth')!).state
      : { token: null };

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      const errorData = {
        message: error.message || error.error || 'Request failed'
      };
      throw { response: { data: errorData } };
    }

    if (options?.responseType === 'blob') {
      const blob = await response.blob();
      return { data: blob as T };
    }

    const json = await response.json();
    return { data: json };
  },

  async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<{ data: T }> {
    const { token } = localStorage.getItem('hireforge-auth')
      ? JSON.parse(localStorage.getItem('hireforge-auth')!).state
      : { token: null };

    const headers: Record<string, string> = {
      ...options?.headers,
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      const errorData = {
        message: error.message || error.error || 'Request failed'
      };
      throw { response: { data: errorData } };
    }

    const json = await response.json();
    return { data: json };
  },

  async delete<T>(endpoint: string, options?: RequestOptions): Promise<{ data: T }> {
    const { token } = localStorage.getItem('hireforge-auth')
      ? JSON.parse(localStorage.getItem('hireforge-auth')!).state
      : { token: null };

    const headers: Record<string, string> = {
      ...options?.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Request failed' }));
      const errorData = {
        message: error.message || error.error || 'Request failed'
      };
      throw { response: { data: errorData } };
    }

    const json = await response.json();
    return { data: json };
  },
};

export default api;
