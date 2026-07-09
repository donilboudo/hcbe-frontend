import { apiClient } from './client';
import type { Event, CreateEventRequest, UpdateEventRequest, ApiResponse } from './types';

export const eventsApi = {
  async getEvents(): Promise<ApiResponse<Event[]>> {
    return apiClient.get<Event[]>('/api/events');
  },

  async getEvent(id: string): Promise<ApiResponse<Event>> {
    return apiClient.get<Event>(`/api/events/${id}`);
  },

  async createEvent(data: CreateEventRequest): Promise<ApiResponse<Event>> {
    return apiClient.post<Event>('/api/events', data);
  },

  async updateEvent(id: string, data: UpdateEventRequest): Promise<ApiResponse<Event>> {
    return apiClient.put<Event>(`/api/events/${id}`, data);
  },

  async deleteEvent(id: string): Promise<ApiResponse<void>> {
    return apiClient.delete<void>(`/api/events/${id}`);
  }
};