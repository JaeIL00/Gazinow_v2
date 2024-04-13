import { authServiceAPI } from '@/global/apis';
import { AxiosError } from 'axios';
import { LogoutFetchData } from './entity';

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
