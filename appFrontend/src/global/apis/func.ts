import { AxiosError } from 'axios';
import { authServiceAPI, publicServiceAPI } from '.';
import {
  AllIssues,
  RenderSavedRoutesType,
  SavedRoute,
  SearchHistoryStationNameTypes,
  SearchPathsTypes,
  SearchStationNameTypes,
  RawSubwayLineName,
  SubwayStrEnd,
  IssueContent,
} from './entity';
import { SignInFetchResponse } from '@/screens/signInScreen/apis/entity';
import { API_BASE_URL } from '@env';
import * as Sentry from '@sentry/react-native';

/**
 * 인증 토큰 재인증 axios
 */
export const tokenReissueFetch = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const res = await authServiceAPI.post<{ data: SignInFetchResponse }>(
      '/api/v1/member/reissue',
      {
        accessToken,
        refreshToken,
      },
      {
        baseURL: API_BASE_URL,
      },
    );
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 지하철역 검색 조회 axios
 */
export const searchStationName = async (params: { stationName: string }) => {
  try {
    const res = await publicServiceAPI.get<SearchStationNameTypes>('/api/v1/search/station', {
      params,
    });
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '지하철역 검색',
      input: { params, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 지하철역 검색 히스토리 조회 axios
 */
export const searchHistoryFetch = async () => {
  try {
    const res = await authServiceAPI.get<{ data: SearchHistoryStationNameTypes[] }>(
      '/api/v1/recentSearch',
    );
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '지하철역 히스토리 조회',
      input: { request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 지하철역 검색 히스토리 저장 axios
 */
export const searchAddHistoryFetch = async (data: {
  stationName: string;
  stationLine: RawSubwayLineName;
}) => {
  try {
    const res = await authServiceAPI.post<{ data: SearchHistoryStationNameTypes }>(
      '/api/v1/recentSearch/add',
      data,
    );
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '지하철역 히스토리 저장',
      input: { data, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 지하철 경로 검색 조회 axios
 */
export const searchPathsFetch = async ({
  params,
  isVerifiedUser,
}: {
  params: SubwayStrEnd;
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
}) => {
  try {
    if (isVerifiedUser === 'success auth') {
      const res = await authServiceAPI.get<{ data: SearchPathsTypes }>('/api/v1/find_road', {
        params,
      });
      return res.data.data;
    } else {
      const res = await publicServiceAPI.get<{ data: SearchPathsTypes }>('/api/v1/find_road', {
        params,
      });
      return res.data.data;
    }
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '지하철 경로 검색 조회',
      input: { params, isVerifiedUser, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 지하철 경로 저장 axios
 */
export const searchPathSaveFetch = async (data: SavedRoute) => {
  try {
    const res = await authServiceAPI.post('/api/v1/my_find_road/add_route', data);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '지하철 경로 저장',
      input: { data, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 저장된 지하철 경로 삭제 axios
 */
export const searchPathDeleteFetch = async (params: { id: number | null }) => {
  try {
    const res = await authServiceAPI.delete('/api/v1/my_find_road/delete_route', { params });
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '저장된 지하철 경로 삭제',
      input: { params, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 지하철 경로 히스토리 조회 axios
 */
export const getSearchRoutesFetch = async () => {
  try {
    // TODO: 기획 최종 나오고 서버 api 개발 된다면 헤더에 토큰유무 필요에 맞는 인스턴스로 교체
    const res = await authServiceAPI.get(`/api/v1/recentSearch`);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 저장된 지하철 경로 조회 axios
 */
export const getSavedRoutesFetch = async () => {
  try {
    const res = await authServiceAPI.get<{ data: RenderSavedRoutesType[] }>(
      `/api/v1/my_find_road/get_roads`,
    );
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '저장된 지하철 경로 조회',
      input: { request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 닉네임 변경 axios
 */
export const changeNicknameFetch = async (newNickname: string) => {
  try {
    await authServiceAPI.post(`/api/v1/member/change_nickname`, {
      nickName: newNickname,
    });
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '닉네임 변경',
      input: { newNickname, request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 전체 조회 axios
 */
export const getAllIssuesFetch = async (params: { page: number }) => {
  try {
    const res = await publicServiceAPI.get<{ data: AllIssues }>(`/api/v1/issue/get_all`, {
      params,
    });
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '전체 이슈 조회',
      input: { request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 노선별 조회 axios
 */
export const getIssuesByLaneFetch = async (params: { page: number; line: string }) => {
  try {
    const res = await publicServiceAPI.get<{ data: AllIssues }>('/api/v1/issue/get_line', {
      params,
    });
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '노선별 이슈 조회',
      input: { request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};

/**
 * 이슈 추천순 조회 axios
 */
export const getPopularIssuesFetch = async () => {
  try {
    const res = await publicServiceAPI.get<{ data: IssueContent[] }>(`/api/v1/issue/get_popular`);
    return res.data.data;
  } catch (err) {
    const error = err as AxiosError;
    Sentry.captureException({
      target: '도움돼요 순 이슈 조회',
      input: { request: error.request },
      output: { status: error.response?.status, error: error.message, response: error.response },
    });
    throw error;
  }
};
