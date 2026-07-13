import { apiClient } from './client';
import { getApiBaseUrl } from './base-url';
import type {
  ApiResponse,
  NewsletterSubscriptionDto,
  SubscribeNewsletterRequest,
  UpdateNewsletterSubscriptionRequest,
} from './types';

const getAuthToken = (): string | null => localStorage.getItem('hcbe_token');

export const newsletterApi = {
  subscribe: (data: SubscribeNewsletterRequest): Promise<ApiResponse<object>> =>
    apiClient.post<object>('/api/newsletter/subscribe', data, false),

  getAll: (params?: {
    language?: string;
    isActive?: boolean;
  }): Promise<ApiResponse<NewsletterSubscriptionDto[]>> => {
    const search = new URLSearchParams();
    if (params?.language) search.set('language', params.language);
    if (params?.isActive !== undefined) search.set('isActive', String(params.isActive));
    const query = search.toString() ? `?${search.toString()}` : '';
    return apiClient.get<NewsletterSubscriptionDto[]>(`/api/newsletter/subscriptions${query}`);
  },

  updateActive: (
    id: string,
    data: UpdateNewsletterSubscriptionRequest,
  ): Promise<ApiResponse<NewsletterSubscriptionDto>> =>
    apiClient.patch<NewsletterSubscriptionDto>(`/api/newsletter/subscriptions/${id}`, data),

  exportCsv: async (): Promise<Blob> => {
    const token = getAuthToken();
    const response = await fetch(`${getApiBaseUrl()}/api/newsletter/subscriptions/export`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return response.blob();
  },
};
