import { AxiosError } from 'axios';

import { axiosInstance } from '../axiosInstance';
import { SearchPathsTypes, SearchSubwayNameTypes } from '@/types/apis/searchTypes';

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
  // 추후 서버 연결
  // return await axiosInstance.post<LoginFetchResponse>('/api/v1/member/login', data);

  // mock
  const mockData = [
    {
      id: 0,
      stationName: '분당',
      stationLine: '1호선',
      stationCode: 242,
    },
    {
      id: 1,
      stationName: '금정',
      stationLine: '4호선',
      stationCode: 42,
    },
  ];

  return mockData;
};

export const searchPathsFetch = async (params: {
  strSubwayName: string;
  strSubwayLine: string;
  endSubwayName: string;
  endSubwayLine: string;
}) => {
  return await axiosInstance.get<SearchPathsTypes>('/api/v1/find_road', { params });
};
