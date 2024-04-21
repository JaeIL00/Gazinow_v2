import {
  changeNicknameFetch,
  getPopularIssuesFetch,
  getSavedRoutesFetch,
  getSearchRoutesFetch,
  searchStationName,
} from './func';
import { useMutation, useQuery, useInfiniteQuery } from 'react-query';
import {
  searchAddHistoryFetch,
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
  getAllIssuesFetch,
  getIssuesByLaneFetch,
} from '@/global/apis/func';
import { RawSubwayLineName, MyRoutesType, SubwayStrEnd } from './entity';
import { AxiosError } from 'axios';
import { subwayFreshLineName } from '@/global/utils';
import { useAppSelect } from '@/store';

/**
 * 지하철역 검색 훅
 */
export const useSearchStationName = (nameValue: string) => {
  const lastChar =
    nameValue.slice(-1) === 'ㅇ' || nameValue.slice(-1) === '여' || nameValue.slice(-1) === '역';
  const stationName = lastChar && nameValue !== '서울역' ? nameValue.slice(0, -1) : nameValue;

  const { data } = useQuery(
    ['search-subway-name', nameValue],
    () => searchStationName({ stationName }),
    {
      enabled: !!stationName,
    },
  );

  const freshData = data ? subwayFreshLineName(data) : [];

  return {
    searchResultData: freshData.sort((a, b) => a.stationName.localeCompare(b.stationName)),
  };
};

/**
 * 지하철역 검색 이력 조회 훅
 */
export const useGetSearchHistory = () => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);
  const { data } = useQuery(['searchHistory'], searchHistoryFetch, {
    enabled: isVerifiedUser === 'success auth',
  });
  const freshData = data?.map((item) => ({ name: item.stationName, line: item.stationLine }));
  return { historyData: freshData ? subwayFreshLineName(freshData) : [] };
};

/**
 * 지하철 경로 조회 훅
 */
export const useGetSearchPaths = ({
  params,
  enabled,
}: {
  params: SubwayStrEnd;
  enabled: boolean;
}) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);
  const { data, isLoading } = useQuery(
    ['search_paths', params],
    () => searchPathsFetch({ params, isVerifiedUser }),
    {
      enabled,
    },
  );
  return { data, isLoading };
};

/**
 * 지하철 경로 저장 훅
 */
export const useSavedSubwayRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess: (data: number) => void;
  onError: (error: AxiosError) => void;
}) => {
  const { data, isLoading, mutate } = useMutation(searchPathSaveFetch, {
    onSuccess,
    onError,
  });

  return { data, isLoading, mutate };
};

/**
 * 저장한 지하철 경로 삭제 훅
 */
export const useDeleteSavedSubwayRoute = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data, isLoading, mutate } = useMutation(searchPathDeleteFetch, {
    onSuccess,
  });

  return { data, isLoading, deleteMutate: mutate };
};

/**
 * 최근 검색한 지하철역 기록 훅
 */
export const useAddRecentSearch = ({
  onSuccess,
}: {
  onSuccess: (data: { id: number; stationName: string; stationLine: RawSubwayLineName }) => void;
}) => {
  const { data, mutate } = useMutation(searchAddHistoryFetch, {
    onSuccess,
  });
  const freshData = data
    ? { line: data.stationLine, name: data.stationName }
    : { line: null, name: '' };
  return { data: subwayFreshLineName([freshData]), addRecentMutate: mutate };
};

/**
 * 검색한 지하철 경로 조회 훅
 */
export const useGetSearchRoutesQuery = () => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);
  const { data } = useQuery(['recentSearch'], getSearchRoutesFetch, {
    enabled: isVerifiedUser === 'success auth',
  });
  return { data };
};

/**
 * 저장한 지하철 경로 조회 훅
 */
export const useGetSavedRoutesQuery = ({
  onSuccess,
}: { onSuccess?: (data: MyRoutesType[]) => void } = {}) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);
  const { data } = useQuery(['getRoads'], getSavedRoutesFetch, {
    enabled: isVerifiedUser === 'success auth',
    onSuccess,
  });
  return { data };
};

/**
 * 닉네임 변경 훅
 */
export const useChangeNicknameQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  const { data, mutate } = useMutation(changeNicknameFetch, {
    onSuccess,
    onError,
  });
  return { data, mutate };
};

/**
 * 이슈 전체 조회 훅
 */
export const useGetAllIssuesQuery = () => {
  const { data, refetch, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery(
    ['getAllIssues'],
    ({ pageParam = 0 }) => getAllIssuesFetch({ page: pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.content && lastPage?.content.length < 15) return undefined;
        return allPages.length;
      },
    },
  );
  return {
    allIssues: data,
    allIssuesRefetch: refetch,
    fetchAllIssuesNextPage: fetchNextPage,
    allIssuesHasNextPage: hasNextPage,
    isAllIssuesLoading: isLoading,
  };
};

/**
 * 이슈 노선별 조회 훅
 */
export const useGetIssuesByLaneQuery = (line: string) => {
  const { data, refetch, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['getIssuesByLane', line],
    ({ pageParam = 0 }) => getIssuesByLaneFetch({ page: pageParam, line }),
    {
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage?.content && lastPage?.content.length < 15) return undefined;
        return allPages.length;
      },
      enabled: line !== '수도권 전체',
    },
  );
  return {
    laneIssues: data,
    laneIssuesRefetch: refetch,
    fetchLaneIssuesNextPage: fetchNextPage,
    laneIssuesHasNextPage: hasNextPage,
  };
};

/**
 * 이슈 추천순 조회 훅
 */
export const useGetPopularIssuesQuery = () => {
  const { data, refetch, isLoading } = useQuery(['getPopularIssues'], getPopularIssuesFetch);
  return {
    popularIssues: data,
    popularIssuesRefetch: refetch,
    isPopularIssuesLoading: isLoading,
  };
};
