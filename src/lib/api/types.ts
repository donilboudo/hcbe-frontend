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

export interface AdminUser {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface CreateAdminUserRequest {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateAdminUserRequest {
  firstName?: string;
  lastName?: string;
  password?: string;
  isAdmin?: boolean;
}

export interface EventMedia {
  id: string;
  mediaType: 'image' | 'video' | string;
  url: string;
  fileName?: string;
  contentType?: string;
  sizeBytes?: number;
  caption?: string;
  displayOrder: number;
  createdAt: string;
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
  media?: EventMedia[];
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

// Diaspora Members
export interface MemberDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  province?: string;
  profession?: string;
  expertise?: string;
  interests?: string;
  availability?: string;
  zone?: string;
  isAdmin: boolean;
  createdAt: string;
}

export interface CreateMemberRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  province?: string;
  profession?: string;
  expertise?: string;
  interests?: string;
  availability?: string;
  zone?: string;
}

export interface UpdateMemberRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  city?: string;
  province?: string;
  profession?: string;
  expertise?: string;
  interests?: string;
  availability?: string;
  zone?: string;
  isAdmin?: boolean;
}

// Membership Applications
export type MembershipApplicationStatus = 'Pending' | 'Approved' | 'Rejected';

export interface MembershipApplicationDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  province?: string;
  profession?: string;
  expertise?: string;
  motivation?: string;
  status: MembershipApplicationStatus;
  memberId?: string;
  createdAt: string;
  reviewedAt?: string;
}

export interface CreateMembershipApplicationRequest {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  city?: string;
  province?: string;
  profession?: string;
  expertise?: string;
  motivation?: string;
}

// Newsletter
export interface NewsletterSubscriptionDto {
  id: string;
  email: string;
  fullName: string;
  preferredLanguage: string;
  consentAcceptedAt: string;
  isActive: boolean;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export interface SubscribeNewsletterRequest {
  email: string;
  fullName: string;
  preferredLanguage: 'fr' | 'en';
  consentAccepted: boolean;
  source: 'home' | 'footer';
}

export interface UpdateNewsletterSubscriptionRequest {
  isActive: boolean;
}

// Grant Programs
export interface GrantProgram {
  id: string;
  title: string;
  description: string;
  icon: string;
  amount: string;
  duration: string;
  eligibilityCriteria: string[];
  applicationUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGrantProgramRequest {
  title: string;
  description: string;
  icon: string;
  amount: string;
  duration: string;
  eligibilityCriteria: string[];
  applicationUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateGrantProgramRequest {
  title?: string;
  description?: string;
  icon?: string;
  amount?: string;
  duration?: string;
  eligibilityCriteria?: string[];
  applicationUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}

// Consultations
export interface Consultation {
  id: string;
  title: string;
  description: string;
  icon: string;
  layoutType: 'featured' | 'card';
  actionUrl?: string;
  actionLabel?: string;
  secondaryActionUrl?: string;
  secondaryActionLabel?: string;
  accentColor: 'emerald' | 'amber';
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateConsultationRequest {
  title: string;
  description: string;
  icon: string;
  layoutType: 'featured' | 'card';
  actionUrl?: string;
  actionLabel?: string;
  secondaryActionUrl?: string;
  secondaryActionLabel?: string;
  accentColor?: 'emerald' | 'amber';
  displayOrder?: number;
  isActive?: boolean;
}

export interface UpdateConsultationRequest {
  title?: string;
  description?: string;
  icon?: string;
  layoutType?: 'featured' | 'card';
  actionUrl?: string;
  actionLabel?: string;
  secondaryActionUrl?: string;
  secondaryActionLabel?: string;
  accentColor?: 'emerald' | 'amber';
  displayOrder?: number;
  isActive?: boolean;
}

// News / Annonces
export interface NewsAttachment {
  id: string;
  fileName: string;
  url: string;
  contentType: string;
  sizeBytes: number;
  createdAt: string;
}

export interface MediaUpload {
  url: string;
  fileName: string;
  contentType: string;
  sizeBytes: number;
}

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  publishedDate?: string;
  isPinned: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  attachments?: NewsAttachment[];
}

export interface CreateNewsRequest {
  title: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  author?: string;
  category?: string;
  publishedDate?: string;
  isPinned?: boolean;
  status: string;
}