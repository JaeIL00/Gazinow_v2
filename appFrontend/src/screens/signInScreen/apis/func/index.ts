import { axiosInstance } from '@/global/apis/axiosInstance';
import { AxiosError } from 'axios';
import { SignInFetchResponse, SignInFormTypes, LogoutFetchData } from '../entity';
import * as Sentry from '@sentry/react-native';

/**
 * 로그인 요청 axios
 */
export const signInFetch = async (data: SignInFormTypes) => {
  try {
    const res = await axiosInstance.post<{ data: SignInFetchResponse }>(
      '/api/v1/member/login',
      data,
    );
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
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
    Sentry.captureException(err);
    const er = err as AxiosError;
    throw er;
  }
};
