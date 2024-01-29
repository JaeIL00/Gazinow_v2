import { quitFetch, searchStationName } from '../func';
import { AxiosError } from 'axios';
import { axiosInstance } from '@/global/apis/axiosInstance';
import { useMutation, useQuery } from 'react-query';
import {
  searchAddHistoryFetch,
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
} from '@/global/apis/func';
import { subwayFreshLineName } from '@/global/utils';
import { SubwayLine, SubwayStrEnd } from '../entity';

export const useQuitMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: quitMutate } = useMutation(quitFetch, { onSuccess });
  return { quitMutate };
};

/**
 * 검색한 지하철 경로 조회 훅
 */
export const useGetSearchRoutesQuery = () => {
  return useQuery('recentSearch', async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/recentSearch`);
      return res.data.data;
    } catch (err) {
      const er = err as AxiosError;
      throw er;
    }
  });
};

/**
 * 저장한 지하철 경로 조회 훅
 */
export const useGetSavedRoutesQuery = () => {
  return useQuery('getRoads', async () => {
    try {
      const res = await axiosInstance.get(`/api/v1/my_find_road/get_roads`);
      return res.data.data;
    } catch (err) {
      const er = err as AxiosError;
      throw er;
    }
  });
};

/**
 * 저장한 경로 삭제 훅
 */
export const useDeleteQuery = async (id: number | null) => {
  try {
    await axiosInstance.delete(`/api/v1/my_find_road/delete_route?id=${id}`);
  } catch (err) {
    const error = err as AxiosError;
    throw error;
  }
};

/**
 * 지하철역 검색 훅
 */
export const useSearchStationName = (stationName: string) => {
  const { data } = useQuery(
    ['search-subway-name', stationName],
    () => searchStationName({ stationName }),
    {
      enabled: !!stationName,
    },
  );

  return {
    searchResultData: data ? subwayFreshLineName(data) : [],
  };
};

/**
 * 지하철역 검색 이력 조회 훅
 */
export const useGetSearchHistory = () => {
  const { data } = useQuery(['searchHistory'], searchHistoryFetch);
  return { data };
};

/**
 * 지하철 경로 조회 훅
 */
export const useGetSearchPaths = (params: SubwayStrEnd) => {
  const { data } = useQuery(['search_paths', params], () => searchPathsFetch(params));

  return { data };
};

/**
 * 지하철 경로 저장 훅
 */
export const useSavedSubwayRoute = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data, mutate } = useMutation(searchPathSaveFetch, {
    onSuccess,
  });

  return { data, mutate };
};

/**
 * 저장한 지하철 경로 삭제 훅
 */
export const useDeleteSavedSubwayRoute = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data, mutate } = useMutation(searchPathDeleteFetch, {
    onSuccess,
  });

  return { data, deleteMutate: mutate };
};
export const useAddRecentSearch = ({
  onSuccess,
}: {
  onSuccess: (data: { id: number; stationName: string; stationLine: SubwayLine }) => void;
}) => {
  const { data, mutate } = useMutation(searchAddHistoryFetch, {
    onSuccess,
  });
  const freshData = data
    ? { line: data.stationLine, name: data.stationName }
    : { line: null, name: '' };
  return { data: subwayFreshLineName([freshData]), addRecentMutate: mutate };
};
