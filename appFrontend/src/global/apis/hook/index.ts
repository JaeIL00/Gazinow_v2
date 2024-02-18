import {
  changeNicknameFetch,
  changePasswordFetch,
  checkPasswordFetch,
  deleteAccountFetch,
  getPopularIssuesFetch,
  getSavedRoutesFetch,
  getSearchRoutesFetch,
  saveMyRoutesFetch,
  searchStationName,
} from '../func';
import { useMutation, useQuery } from 'react-query';
import {
  searchAddHistoryFetch,
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
  getAllIssuesFetch,
  getIssuesByLaneFetch,
} from '@/global/apis/func';
import { RawSubwayLineName, SubwayStrEnd } from '../entity';
import { AxiosError } from 'axios';
import { subwayFreshLineName } from '@/global/utils';

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
  const freshData = data?.map((item) => ({ name: item.stationName, line: item.stationLine }));
  return { historyData: freshData ? subwayFreshLineName(freshData) : [] };
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
export const useSavedSubwayRoute = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: AxiosError) => void;
}) => {
  const { data, mutate } = useMutation(searchPathSaveFetch, {
    onSuccess,
    onError,
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
 * 회원 탈퇴 훅
 */
export const useDeleteAccountMutation = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: any) => void;
}) => {
  const { mutate: deleteAccountMutate } = useMutation(deleteAccountFetch, { onSuccess, onError });
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

/**
 * 내 경로 저장 훅
 */
export const useSaveMyRoutesQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  const { data, mutate } = useMutation(saveMyRoutesFetch, {
    onSuccess,
    onError,
  });
  return { data, mutate };
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
 * 비밀번호 확인 훅
 */
export const useCheckPasswordQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: checkPasswordMutate } = useMutation(checkPasswordFetch, {
    onSuccess,
    onError,
  });
  return { checkPasswordMutate };
};

/**
 * 비밀번호 변경 훅
 */
export const useChangePasswordQuery = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError?: (error: any) => void;
}) => {
  const { mutate: changePasswordMutate } = useMutation(changePasswordFetch, {
    onSuccess,
    onError,
  });
  return { changePasswordMutate };
};

/**
 * 이슈 전체 조회 훅
 */
export const useGetAllIssuesQuery = () => {
  const { data } = useQuery(['getAllIssues'], getAllIssuesFetch);
  return { data };
};

/**
 * 이슈 노선별 조회 훅
 */
export const useGetIssuesByLaneQuery = (line: string) => {
  const { data } = useQuery(['getIssuesByLane'], () => getIssuesByLaneFetch({ line }));
  return { data };
};

/**
 * 이슈 추천순 조회 훅
 */
export const useGetPopularIssuesQuery = () => {
  const { data } = useQuery(['getPopularIssues'], getPopularIssuesFetch);
  return { data };
};
