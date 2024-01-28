import { subwayFreshLineName } from '@/global/utils';
import axios, { AxiosError } from 'axios';
import { axiosInstance } from '../axiosInstance';
import { SavedRoute, SearchPathsTypes, SearchStationNameTypes, SubwayLine } from '../entity';
import { LoginFetchResponse, LogoutFetchData } from '@/screens/loginScreen/apis/entity';
import { API_BASE_URL } from '@env';

/**
 * 인증 토근 재인증 axios
 */
export const logoutFetch = async ({ accessToken, refreshToken }: LogoutFetchData) => {
  try {
    await axiosInstance.post('/api/v1/member/logout', { accessToken, refreshToken });
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 인증 토근 재인증 axios
 */
export const tokenReissueFetch = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const res = await axios.post<{ data: LoginFetchResponse }>(
      '/api/v1/member/reissue',
      {
        accessToken,
        refreshToken,
      },
      {
        baseURL: API_BASE_URL,
      },
    );
    return {
      newAccessToken: res.data.data.accessToken,
      newRefreshToken: res.data.data.refreshToken,
    };
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 회원 탈퇴 axios
 */
export const quitFetch = async () => {
  try {
    await axiosInstance.delete('/api/v1/member/delete_member', { data: {} });
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 지하철역 검색 조회 axios
 */
export const searchStationName = async (params: { stationName: string }) => {
  try {
    const res = await axiosInstance.get<SearchStationNameTypes>('/api/v1/search/station', {
      params,
    });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 지하철역 검색 히스토리 조회 axios
 */
export const searchHistoryFetch = async () => {
  try {
    const res = await axiosInstance.get<SearchStationNameTypes>('/api/v1/recentSearch');
    return res.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 지하철역 검색 히스토리 저장 axios
 */
export const searchAddHistoryFetch = async (data: { stationName: string; stationLine: string }) => {
  try {
    const res = await axiosInstance.post<{
      // 백엔드 : stationCode 대응
      id?: number;
      stationName: string;
      stationLine: SubwayLine;
    }>('/api/v1/recentSearch/add', data);

    return subwayFreshLineName([res.data])[0];
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 지하철 경로 검색 조회 axios
 */
export const searchPathsFetch = async (params: {
  strSubwayName: string;
  strSubwayLine: string;
  endSubwayName: string;
  endSubwayLine: string;
}) => {
  try {
    const res = await axiosInstance.get<{ data: SearchPathsTypes }>('/api/v1/find_road', {
      params,
    });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 지하철 경로 저장 axios
 */
export const searchPathSaveFetch = async (data: SavedRoute) => {
  try {
    const res = await axiosInstance.post('/api/v1/my_find_road/add_route', data);
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

/**
 * 저장된 지하철 경로 삭제 axios
 */
export const searchPathDeleteFetch = async (params: { id: number }) => {
  try {
    const res = await axiosInstance.delete('/api/v1/my_find_road/delete_route', { params });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};
