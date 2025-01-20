// src/infrastructure/utils/apiClient.ts

import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '../constants/EndPoints';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const get = async <T>(url: string): Promise<T> => {
  console.log("url de api pokemon"+url)
  const response: AxiosResponse<T> = await apiClient.get(url);
  return response.data;
};

export const post = async <T>(url: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.post(url, data);
  return response.data;
};

export const put = async <T>(url: string, data: any): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.put(url, data);
  return response.data;
};

export const del = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await apiClient.delete(url);
  return response.data;
};

// Interceptor para manejar errores globalmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí puedes manejar errores globalmente, por ejemplo:
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
