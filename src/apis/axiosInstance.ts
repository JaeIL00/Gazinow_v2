import { API_BASE_URL, T_DATA_BASE_URL } from '@env';
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const publicDataInstance = axios.create({
  baseURL: T_DATA_BASE_URL,
});
