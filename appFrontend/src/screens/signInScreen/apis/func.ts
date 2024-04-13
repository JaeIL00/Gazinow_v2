import { publicServiceAPI } from '@/global/apis';
import { AxiosError } from 'axios';
import { SignInFetchResponse, SignInFormTypes } from './entity';

/**
 * 로그인 요청 axios
 */
export const signInFetch = async (data: SignInFormTypes) => {
  try {
    const res = await publicServiceAPI.post<{ data: SignInFetchResponse }>(
      '/api/v1/member/login',
      data,
    );
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
