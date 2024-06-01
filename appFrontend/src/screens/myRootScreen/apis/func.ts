import { authServiceAPI } from '@/global/apis';
import { AxiosError } from 'axios';
import { LogoutFetchData } from './entity';
import * as Sentry from '@sentry/react-native';

/**
 * 로그아웃 요청 axios
 */
export const logoutFetch = async ({ accessToken, refreshToken }: LogoutFetchData) => {
  try {
    await authServiceAPI.post('/api/v1/member/logout', { accessToken, refreshToken });
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 회원 탈퇴 axios
 */
export const deleteAccountFetch = async () => {
  try {
    await authServiceAPI.delete('/api/v1/member/delete_member', { data: {} });
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 비밀번호 확인 axios
 */
export const checkPasswordFetch = async (passwordInput: string) => {
  try {
    await authServiceAPI.post(`/api/v1/member/check_password`, {
      checkPassword: passwordInput,
    });
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 비밀번호 변경 axios
 */
export const changePasswordFetch = async (data: {
  curPassword: string;
  changePassword: string;
  confirmPassword: string;
}) => {
  try {
    const res = await authServiceAPI.post(`/api/v1/member/change_password`, data);
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 닉네임 변경 axios
 */
export const changeNicknameFetch = async (nickName: string) => {
  try {
    await authServiceAPI.post(`/api/v1/member/change_nickname`, { nickName });
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '닉네임 변경',
      input: { nickName, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 닉네임 중복 검사 axios
 */
export const checkNicknameFetch = async (nickName: string) => {
  try {
    await authServiceAPI.post(`/api/v1/member/check-nickname`, { nickName });
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};
