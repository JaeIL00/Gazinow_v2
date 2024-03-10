import { AxiosError } from 'axios';
import { IssueGet } from './entity';
import * as Sentry from '@sentry/react';
import { axiosInstance } from '@/global/apis/axiosInstance';

/**
 * 상세 이슈 조회
 */
export const getIssueDetail = async (params: { id: number | null }) => {
  try {
    const res = await axiosInstance.get<{ data: IssueGet }>('/api/v1/issue/get', {
      params,
    });
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 도움돼요 추가
 */
export const postLike = async (issueId: number) => {
  try {
    const res = await axiosInstance.post(`/api/v1/like?issueId=${issueId}`);
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 도움돼요 삭제
 */
export const deletePostLike = async (issueId: number) => {
  try {
    const res = await axiosInstance.delete(`/api/v1/like?issueId=${issueId}`);
    return res.data.data;
  } catch (err) {
    Sentry.captureException(err);
    const error = err as AxiosError;
    throw error;
  }
};
