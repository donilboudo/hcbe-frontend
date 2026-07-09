import { apiClient } from './client';
import type { ApiResponse, Association, CreateAssociationRequest, UpdateAssociationRequest } from './types';

export const associationsApi = {
  // Get all associations (public - active only)
  getAssociations: async (): Promise<ApiResponse<Association[]>> => {
    return await apiClient.get<Association[]>('/api/associations');
  },

  // Get all associations for admin (includes inactive)
  getAssociationsForAdmin: async (): Promise<ApiResponse<Association[]>> => {
    return await apiClient.get<Association[]>('/api/admin/associations');
  },

  // Get association by ID (public - active only)
  getAssociation: async (id: string): Promise<ApiResponse<Association>> => {
    return await apiClient.get<Association>(`/api/associations/${id}`);
  },

  // Get association by ID for admin (includes inactive)
  getAssociationForAdmin: async (id: string): Promise<ApiResponse<Association>> => {
    return await apiClient.get<Association>(`/api/admin/associations/${id}`);
  },

  // Create association (admin only)
  createAssociation: async (data: CreateAssociationRequest): Promise<ApiResponse<Association>> => {
    return await apiClient.post<Association>('/api/associations', data);
  },

  // Update association (admin only)
  updateAssociation: async (id: string, data: UpdateAssociationRequest): Promise<ApiResponse<Association>> => {
    return await apiClient.put<Association>(`/api/associations/${id}`, data);
  },

  // Delete association (admin only)
  deleteAssociation: async (id: string): Promise<ApiResponse<void>> => {
    return await apiClient.delete<void>(`/api/associations/${id}`);
  }
};