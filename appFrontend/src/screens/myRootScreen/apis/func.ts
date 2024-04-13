import { authServiceAPI } from '@/global/apis';
import * as Sentry from '@sentry/react-native';
import { AxiosError } from 'axios';
import { LogoutFetchData } from './entity';

/**
 * 로그아웃 요청 axios
 */
export const logoutFetch = async ({ accessToken, refreshToken }: LogoutFetchData) => {
  try {
    await authServiceAPI.post('/api/v1/member/logout', { accessToken, refreshToken });
  } catch (err) {
    Sentry.captureException(err);
    const er = err as AxiosError;
    throw er;
  }
};
