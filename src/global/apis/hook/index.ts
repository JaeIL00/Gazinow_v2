import {
  deleteAccountFetch,
  getSavedRoutesFetch,
  getSearchRoutesFetch,
  searchStationName,
} from '../func';
import { useMutation, useQuery } from 'react-query';
import {
  searchAddHistoryFetch,
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
} from '@/global/apis/func';
import { subwayFreshLineName } from '@/global/utils';
import { SubwayStrEnd } from '../entity';

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
export const useAddResetSearch = ({
  onSuccess,
}: {
  onSuccess: (data: {
    // 백엔드 : stationCode 대응
    id?: number;
    stationName: string;
    stationLine: string;
  }) => void;
}) => {
  const { data, mutate } = useMutation(searchAddHistoryFetch, {
    onSuccess,
  });

  return { data, addRecentMutate: mutate };
};

/**
 * 회원 탈퇴 훅
 */
export const useDeleteAccountMutation = ({ onSuccess }: { onSuccess: () => void }) => {
  const { mutate: deleteAccountMutate } = useMutation(deleteAccountFetch, { onSuccess });
  return { deleteAccountMutate };
};

/**
 * 검색한 지하철 경로 조회 훅
 */
export const useGetSearchRoutesQuery = () => {
  const { data } = useQuery(['recentSearch'], getSearchRoutesFetch);
  return { data };
};

/**
 * 저장한 지하철 경로 조회 훅
 */
export const useGetSavedRoutesQuery = () => {
  const { data } = useQuery(['getRoads'], getSavedRoutesFetch);
  return { data };
};
