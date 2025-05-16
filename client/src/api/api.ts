import type { LoginData } from '@/types/LoginData';
import type { SigninResponse } from '@/types/SigninResponse';
import type { Token } from '@/types/Token';
import type { UpdateTokenData } from '@/types/TokenData';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cryptoWatcherToken');

  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use((response) => {
  const existingToken = localStorage.getItem('cryptoWatcherToken');
  const responseToken = response.data?.token;

  if (responseToken && (!existingToken || existingToken !== responseToken)) {
    localStorage.setItem('cryptoWatcherToken', responseToken);
    delete response.data.token;
  }
  
  return response;
}, (error) => {
  return Promise.reject(error);
});

export const signIn = (loginData: LoginData) =>
  api.post<SigninResponse>('/user/sign-in', loginData);

export const getTokens = () => api.get<Token[]>('/tokens');
export const getTokensTotalValue = () => api.get<{ total: number }>('/tokens/total');
export const updateTokenData = ({ id, ...data }: UpdateTokenData) =>
  api.patch<Token>(`/tokens/${id}`, data);
export const updateTokenFavourite = (id: string) =>
  api.patch<Token>(`/tokens/favourite/${id}`);