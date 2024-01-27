import { useMutation, useQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { SearchSubwayNameTypes, SubwayStrEnd } from '@/global/types/apis/searchTypes';
import { useCallback, useState } from 'react';
import {
  searchAddHistoryFetch,
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
  searchSubwayName,
} from '@/global/apis/search';
import { subwayFreshLineName } from '@/global/utils';

export const useSearchSubwayName = (subwayName: string) => {
  const { data } = useQuery(
    ['search-subway-name', subwayName],
    () => searchSubwayName({ subwayName }),
    {
      enabled: !!subwayName,
    },
  );

  return {
    searchResultData: data ? subwayFreshLineName(data) : [],
  };
};

export const useSerarchHistory = () => {
  const { data } = useQuery(['searchHistory'], searchHistoryFetch);
  return { data };
};

export const useSearchPaths = (params: SubwayStrEnd) => {
  const { data } = useQuery(['search_paths', params], () => searchPathsFetch(params));

  return { data };
};

export const useSavedSubwayRoute = ({ onSuccess }: { onSuccess: () => void }) => {
  const { data, mutate } = useMutation(searchPathSaveFetch, {
    onSuccess,
  });

  return { data, mutate };
};

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
