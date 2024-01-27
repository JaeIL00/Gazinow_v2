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
