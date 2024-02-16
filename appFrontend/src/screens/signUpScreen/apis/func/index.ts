import { axiosInstance } from '@/global/apis/axiosInstance';
import { AxiosError } from 'axios';
import { SightUpResponse } from '../../type';
import { Alert } from 'react-native';

/**
 * 이메일 인증 요청 axios
 */
export const emailConfirmFetch = async (email: string) => {
  try {
    Alert.alert(email);
    const res = await axiosInstance.post<{ data: string }>('/api/v1/member/email-confirm', {
      email,
    });
    Alert.alert(res.data.data);
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 닉네임 중복 확인 axios
 */
export const checkNicknameFetch = async (nickName: string) => {
  try {
    const res = await axiosInstance.post<{ message: string; state: 200 | 409 }>(
      '/api/v1/member/check-nickname',
      {
        nickName,
      },
    );
    return res.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 회원가입 axios
 */
export const signUpFetch = async (data: { email: string; password: string; nickName: string }) => {
  try {
    const res = await axiosInstance.post<{
      data: SightUpResponse;
    }>('/api/v1/member/signup', data);
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};
