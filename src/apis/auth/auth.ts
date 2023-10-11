import { LoginFetchProps, LoginFetchResponse } from './type';
import mockData from '../../../mocks/loginResponse.json';
import axiosInstance from '../axiosInstance';

export const loginFetch = async (data: LoginFetchProps) => {
  // 추후 서버 연결
  // return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/login', data);
  return mockData;
};
