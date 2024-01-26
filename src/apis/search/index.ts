import { AxiosError } from 'axios';

import { axiosInstance } from '../axiosInstance';
import {
  SearchHistoryTypes,
  SearchPathsTypes,
  SearchSubwayNameTypes,
} from '@/types/apis/searchTypes';

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
    const res = await axiosInstance.get<SearchHistoryTypes>('/api/v1/recentSearch');
    return res.data;
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
