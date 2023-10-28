import { API_BASE_URL, SEOUL_PUBLIC_BASE_URL } from '@env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const publicDataInstance = axios.create({
  baseURL: SEOUL_PUBLIC_BASE_URL,
});
