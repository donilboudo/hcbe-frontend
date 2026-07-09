import { getApiBaseUrl } from './base-url';
import type { ApiResponse } from './types';

export class ApiClient {
  private baseURL: string;

  constructor() {
    // In development, use relative URLs to leverage Vite proxy
    // In production or when VITE_API_URL is set, use the full URL
    this.baseURL = getApiBaseUrl();
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('hcbe_token');
  }

  private getHeaders(includeAuth = true): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  private handleFetchError(error: unknown, endpoint: string): never {
    // Provide more detailed error information
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error(`Unable to connect to API at ${this.baseURL}${endpoint}. Please ensure the backend server is running.`);
    }
    throw error;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    // For login endpoint, 401 is expected with wrong credentials, so don't redirect
    const isLoginEndpoint = response.url.includes('/api/auth/login');
    
    if (response.status === 401 && !isLoginEndpoint) {
      // Unauthorized - clear token and redirect to login (but not for login endpoint itself)
      localStorage.removeItem('hcbe_token');
      localStorage.removeItem('hcbe_user');
      window.location.href = '/admin/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      // Try to parse error response as JSON, fallback to text
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorText = await response.text();
        if (errorText) {
          try {
            const errorJson = JSON.parse(errorText);
            errorMessage = errorJson.message || errorText;
          } catch {
            errorMessage = errorText;
          }
        }
      } catch {
        // If we can't read the response, use status text
        errorMessage = response.statusText || `HTTP ${response.status}`;
      }
      
      // For 401 on login, return a proper error response
      if (response.status === 401 && isLoginEndpoint) {
        return {
          success: false,
          message: 'Invalid email or password',
          data: null,
          errors: null
        } as ApiResponse<T>;
      }
      
      throw new Error(errorMessage);
    }

    if (response.status === 204) {
      return {
        success: true,
        message: 'Success',
        data: null,
        errors: null,
      } as ApiResponse<T>;
    }

    const text = await response.text();
    if (!text.trim()) {
      return {
        success: true,
        message: 'Success',
        data: null,
        errors: null,
      } as ApiResponse<T>;
    }

    const data = JSON.parse(text);
    return data as ApiResponse<T>;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleFetchError(error, endpoint);
    }
  }

  async post<T>(endpoint: string, data?: any, includeAuth = true): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(includeAuth),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleFetchError(error, endpoint);
    }
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleFetchError(error, endpoint);
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      this.handleFetchError(error, endpoint);
    }
  }
}

export const apiClient = new ApiClient();