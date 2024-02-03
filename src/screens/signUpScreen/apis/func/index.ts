import { axiosInstance } from '@/global/apis/axiosInstance';
import { AxiosError } from 'axios';

/**
 * 이메일 인증 요청 훅
 */
export const emailConfirmFetch = async (email: string) => {
  try {
    const res = await axiosInstance.post('/api/v1/member/email-confirm', { email });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};
