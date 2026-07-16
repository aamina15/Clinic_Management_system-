export enum UserRole {
  PATIENT = "PATIENT",
  DOCTOR = "DOCTOR",
  RECEPTIONIST = "RECEPTIONIST",
  ADMIN = "ADMIN",
}

export type PaginatedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
};

export type ApiErrorResponse = {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  errors?: Array<{ field: string; message: string }>;
};
