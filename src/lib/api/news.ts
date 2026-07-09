import { apiClient } from './client';
import type { ApiResponse, CreateNewsRequest, NewsArticle } from './types';

export const newsApi = {
  getPublishedNews: (): Promise<ApiResponse<NewsArticle[]>> =>
    apiClient.get<NewsArticle[]>('/api/news'),

  getNewsById: (id: string): Promise<ApiResponse<NewsArticle>> =>
    apiClient.get<NewsArticle>(`/api/news/${id}`),

  getNewsForAdmin: (): Promise<ApiResponse<NewsArticle[]>> =>
    apiClient.get<NewsArticle[]>('/api/news/admin'),

  getNewsByIdForAdmin: (id: string): Promise<ApiResponse<NewsArticle>> =>
    apiClient.get<NewsArticle>(`/api/news/admin/${id}`),

  createNews: (data: CreateNewsRequest): Promise<ApiResponse<NewsArticle>> =>
    apiClient.post<NewsArticle>('/api/news', data),

  updateNews: (id: string, data: CreateNewsRequest): Promise<ApiResponse<NewsArticle>> =>
    apiClient.put<NewsArticle>(`/api/news/${id}`, data),

  deleteNews: (id: string): Promise<ApiResponse<void>> =>
    apiClient.delete<void>(`/api/news/${id}`),
};
