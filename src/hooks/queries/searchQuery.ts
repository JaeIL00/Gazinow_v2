import { useMutation, useQuery } from 'react-query';

import { AxiosResponse } from 'axios';
import { SearchSubwayNameTypes, SubwayStrEnd } from '@/types/apis/searchTypes';
import { useCallback, useState } from 'react';
import {
  searchHistoryFetch,
  searchPathDeleteFetch,
  searchPathSaveFetch,
  searchPathsFetch,
  searchSubwayName,
} from '@/apis/search';

export const useSearchSubwayName = (subwayName: string) => {
  const [resultList, setResultList] = useState<SearchSubwayNameTypes[]>([]);
  const { data } = useQuery(
    ['search-subway-name', subwayName],
    () => searchSubwayName({ subwayName }),
    {
      enabled: !!subwayName,
    },
  );

  // 인천선 === 인천1
  // 인천2호선 === 인천2
  // 용인경전철 === 애버라인
  // 우이신설경전철 === 우이신설
  // 김포도시철도 === 김포골드
  const freshLineName = useCallback((list: SearchSubwayNameTypes['data']) => {
    return list.map((item) => {
      switch (item.line) {
        case '인천선':
          return { name: item.name, line: '인천1' };
        case '인천2호선':
          return { name: item.name, line: '인천2' };
        case '용인경전철':
          return { name: item.name, line: '애버라인' };
        case '우이신설경전철':
          return { name: item.name, line: '우이신설' };
        case '김포도시철도':
          return { name: item.name, line: '김포골드' };
        default:
          return item;
      }
    });
  }, []);
  return {
    searchResultData: data ? freshLineName(data) : [],
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
