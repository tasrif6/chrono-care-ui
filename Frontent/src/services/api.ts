import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Types
export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber?: string;
  nic?: string;
  dateOfBirth?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  role: 'patient' | 'doctor' | 'admin';
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile_number?: string;
  nic?: string;
  date_of_birth?: string;
  address?: string;
  gender?: 'male' | 'female' | 'other';
  role: 'patient' | 'doctor' | 'admin';
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
}

// API Functions
export const authAPI = {
  register: async (data: RegisterData): Promise<UserResponse> => {
    const response = await api.post<UserResponse>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginData): Promise<TokenResponse> => {
    const response = await api.post<TokenResponse>('/auth/login', data);
    return response.data;
  },
};

export default api;