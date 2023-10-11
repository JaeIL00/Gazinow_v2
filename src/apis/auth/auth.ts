import mockData from '../../../mocks/loginResponse.json';
import axiosInstance from '../axiosInstance';
import type { LoginFetchProps, LoginFetchResponse, TokenTypes } from '@/types/apis';

export const loginFetch = async (data: LoginFetchProps) => {
  // 추후 서버 연결
  // return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/login', data);

  // mock
  return mockData;
};

export const autoLoginFetch = async (data: TokenTypes) => {
  // 추후 서버 연결
  // return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/reissue', data);

  // mock
  return mockData;
};
