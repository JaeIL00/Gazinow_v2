import { axiosInstance } from '@/global/apis/axiosInstance';
import { AxiosError } from 'axios';
import { LoginFetchResponse, LoginFormTypes, LogoutFetchData } from '../entity';

/**
 * 로그인 요청 axios
 */
export const loginFetch = async (data: LoginFormTypes) => {
  try {
    const res = await axiosInstance.post<{ data: LoginFetchResponse }>(
      '/api/v1/member/login',
      data,
    );
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 로그아웃 요청 axios
 */
export const logoutFetch = async ({ accessToken, refreshToken }: LogoutFetchData) => {
  try {
    await axiosInstance.post('/api/v1/member/logout', { accessToken, refreshToken });
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};