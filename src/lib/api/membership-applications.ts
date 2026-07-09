import { apiClient } from './client';
import type {
  ApiResponse,
  CreateMembershipApplicationRequest,
  MemberDto,
  MembershipApplicationDto,
  MembershipApplicationStatus,
} from './types';

export const membershipApplicationsApi = {
  submit: (data: CreateMembershipApplicationRequest): Promise<ApiResponse<MembershipApplicationDto>> =>
    apiClient.post<MembershipApplicationDto>('/api/membership-applications', data, false),

  getAll: (status?: MembershipApplicationStatus): Promise<ApiResponse<MembershipApplicationDto[]>> => {
    const query = status ? `?status=${status}` : '';
    return apiClient.get<MembershipApplicationDto[]>(`/api/membership-applications/admin${query}`);
  },

  getById: (id: string): Promise<ApiResponse<MembershipApplicationDto>> =>
    apiClient.get<MembershipApplicationDto>(`/api/membership-applications/admin/${id}`),

  approve: (id: string): Promise<ApiResponse<MemberDto>> =>
    apiClient.post<MemberDto>(`/api/membership-applications/${id}/approve`, {}),

  reject: (id: string): Promise<ApiResponse<MembershipApplicationDto>> =>
    apiClient.post<MembershipApplicationDto>(`/api/membership-applications/${id}/reject`, {}),

  delete: (id: string): Promise<ApiResponse<boolean>> =>
    apiClient.delete<boolean>(`/api/membership-applications/${id}`),
};
