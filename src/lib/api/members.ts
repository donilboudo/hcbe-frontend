import { apiClient } from './client';
import type { ApiResponse, CreateMemberRequest, MemberDto, UpdateMemberRequest } from './types';

export const membersApi = {
  getAllMembers: (): Promise<ApiResponse<MemberDto[]>> =>
    apiClient.get<MemberDto[]>('/api/members/admin'),

  getMemberById: (id: string): Promise<ApiResponse<MemberDto>> =>
    apiClient.get<MemberDto>(`/api/members/${id}`),

  createMember: (data: CreateMemberRequest): Promise<ApiResponse<MemberDto>> =>
    apiClient.post<MemberDto>('/api/members', data),

  updateMember: (id: string, data: UpdateMemberRequest): Promise<ApiResponse<MemberDto>> =>
    apiClient.put<MemberDto>(`/api/members/${id}`, data),

  deleteMember: (id: string): Promise<ApiResponse<boolean>> =>
    apiClient.delete<boolean>(`/api/members/${id}`),

  updateAdminStatus: (id: string, isAdmin: boolean): Promise<ApiResponse<MemberDto>> =>
    apiClient.put<MemberDto>(`/api/members/${id}/admin?isAdmin=${isAdmin}`),
};
