import { LoginFetchProps, LoginFetchResponse } from './type';
import axiosInstance from '../axiosInstance';

export const loginFetch = async (data: LoginFetchProps) => {
  return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/login', data);
};
