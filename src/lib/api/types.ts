// API Types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
  errors?: string[] | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location?: string;
  type?: string;
  zone?: string;
  capacity?: number;
  registrationDeadline?: string;
  meetingLink?: string;
  imageUrl?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  date: string;
  location?: string;
  type?: string;
  zone?: string;
  capacity?: number;
  registrationDeadline?: string;
  meetingLink?: string;
  imageUrl?: string;
  status: string;
}

export interface UpdateEventRequest {
  title?: string;
  description?: string;
  date?: string;
  location?: string;
  type?: string;
  zone?: string;
  capacity?: number;
  registrationDeadline?: string;
  meetingLink?: string;
  imageUrl?: string;
  status?: string;
}

export interface Association {
  id: string;
  name: string;
  description?: string;
  province: string;
  city: string;
  contact?: string;
  phone?: string;
  president?: string;
  memberCount?: string;
  foundedYear?: number;
  imageUrl?: string;
  website?: string;
  domains: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssociationRequest {
  name: string;
  description?: string;
  province: string;
  city: string;
  contact?: string;
  phone?: string;
  president?: string;
  memberCount?: string;
  foundedYear?: number;
  imageUrl?: string;
  website?: string;
  domains: string[];
}

export interface UpdateAssociationRequest {
  name?: string;
  description?: string;
  province?: string;
  city?: string;
  contact?: string;
  phone?: string;
  president?: string;
  memberCount?: string;
  foundedYear?: number;
  imageUrl?: string;
  website?: string;
  domains?: string[];
  isActive?: boolean;
}

// Project types
export interface Project {
  id: string;
  title: string;
  location: string;
  type: string; // "Développement au Burkina", "Initiative Locale"
  status: string; // "En cours", "Actif", "Planification", "Terminé"
  progress: number; // 0-100
  description: string;
  imageUrl?: string;
  budget: string;
  fundsRaised: string;
  beneficiaries: string;
  startDate?: string;
  endDate?: string;
  partners: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  title: string;
  location: string;
  type: string;
  status: string;
  progress: number;
  description: string;
  imageUrl?: string;
  budget: string;
  fundsRaised: string;
  beneficiaries: string;
  startDate?: string;
  endDate?: string;
  partners?: string[];
}

export interface UpdateProjectRequest {
  title?: string;
  location?: string;
  type?: string;
  status?: string;
  progress?: number;
  description?: string;
  imageUrl?: string;
  budget?: string;
  fundsRaised?: string;
  beneficiaries?: string;
  startDate?: string;
  endDate?: string;
  partners?: string[];
  isActive?: boolean;
}

// Team Members
export interface TeamMemberDto {
  id: number;
  name: string;
  position: string;
  region: string;
  zone: string;
  photo?: string;
  bio?: string;
  email?: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeamMemberRequest {
  name: string;
  position: string;
  region: string;
  zone: string;
  photo?: string;
  bio?: string;
  email?: string;
  order?: number;
}

export interface UpdateTeamMemberRequest {
  name?: string;
  position?: string;
  region?: string;
  zone?: string;
  photo?: string;
  bio?: string;
  email?: string;
  isActive?: boolean;
  order?: number;
}