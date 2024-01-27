import { AxiosError } from 'axios';

import { axiosInstance } from '../axiosInstance';
import {
  SavedRoute,
  SearchPathsTypes,
  SearchSubwayNameTypes,
  SubPath,
  SubwayLine,
} from '@/types/apis/searchTypes';
import { subwayFreshLineName } from '@/utils';

export const searchSubwayName = async (params: { subwayName: string }) => {
  try {
    const res = await axiosInstance.get<SearchSubwayNameTypes>('/api/v1/search/subway', {
      params,
    });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

export const searchHistoryFetch = async () => {
  try {
    const res = await axiosInstance.get<SearchSubwayNameTypes>('/api/v1/recentSearch');
    return res.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

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

export const searchPathSaveFetch = async (data: SavedRoute) => {
  try {
    const res = await axiosInstance.post('/api/v1/my_find_road/add_route', data);
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};

export const searchPathDeleteFetch = async (params: { id: number }) => {
  try {
    const res = await axiosInstance.delete('/api/v1/my_find_road/delete_route', { params });
    return res.data.data;
  } catch (err) {
    const er = err as AxiosError;
    throw er;
  }
};
