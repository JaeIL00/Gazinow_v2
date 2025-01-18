import { AxiosError } from 'axios';
import { CommentReportType, IssueGet, PostCommentType } from './entity';
import * as Sentry from '@sentry/react';
import { authServiceAPI, publicServiceAPI } from '@/global/apis';
import { AllComments } from '@/global/apis/entity';

/**
 * 이슈 본문 조회
 */
export const getIssueDetail = async ({
  params,
  isVerifiedUser,
}: {
  params: { id: number | null };
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
}) => {
  try {
    if (isVerifiedUser === 'success auth') {
      const res = await authServiceAPI.get<{ data: IssueGet }>('/api/v1/issue/get', {
        params,
      });
      return res.data.data;
    } else {
      const res = await publicServiceAPI.get<{ data: IssueGet }>('/api/v1/issue/get', {
        params,
      });
      return res.data.data;
    }
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 본문 조회',
      input: { params, isVerifiedUser, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 본문 도움돼요 추가
 */
export const postLike = async (issueId: number) => {
  try {
    await authServiceAPI.post(`/api/v1/like?issueId=${issueId}`);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 본문 도움돼요 추가',
      input: { issueId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 본문 도움돼요 삭제
 */
export const deletePostLike = async (issueId: number) => {
  try {
    await authServiceAPI.delete(`/api/v1/like?issueId=${issueId}`);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 본문 도움돼요 삭제',
      input: { issueId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈에 달린 댓글 조회
 */
export const getCommentsOnAIssueFetch = async ({
  isVerifiedUser,
  params,
}: {
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
  params: { issueId: number; page: number };
}) => {
  try {
    if (isVerifiedUser === 'success auth') {
      const res = await authServiceAPI.get<{ data: AllComments }>(
        `/api/v1/comments/${params.issueId}`,
        { params },
      );
      return res.data.data;
    } else {
      const res = await publicServiceAPI.get<{ data: AllComments }>(
        `/api/v1/comments/${params.issueId}`,
        { params },
      );
      return res.data.data;
    }
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 조회',
      input: { isVerifiedUser, issueId: params.issueId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 댓글 등록
 */
export const postComment = async (body: PostCommentType) => {
  try {
    await authServiceAPI.post(`/api/v1/comments`, body);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 등록',
      input: { body, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 댓글 삭제
 */
export const deleteComment = async (issueCommentId: number) => {
  try {
    await authServiceAPI.delete(`/api/v1/comments/${issueCommentId}`);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 삭제',
      input: { issueCommentId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 댓글 좋아요 추가
 */
export const postCommentLike = async (issueCommentId: number) => {
  try {
    await authServiceAPI.post(`/api/v1/comments/likes`, { issueCommentId });
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 좋아요 추가',
      input: { issueCommentId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 댓글 좋아요 삭제
 */
export const deleteCommentLike = async (issueCommentId: number) => {
  try {
    await authServiceAPI.delete(`/api/v1/comments/likes/${issueCommentId}`);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 좋아요 삭제',
      input: { issueCommentId, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 댓글 신고
 */
export const reportComment = async (data: CommentReportType) => {
  try {
    await authServiceAPI.post('/api/v1/report', data);
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '이슈 댓글 신고',
      input: { data, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};
