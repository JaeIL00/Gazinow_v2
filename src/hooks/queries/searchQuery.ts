import { useQuery } from 'react-query';

import { searchHistoryFetch } from '@/apis/search/searchHistoryApi';

export const useSerarchHistory = () => {
  const { data } = useQuery('searchHistory', searchHistoryFetch);
  return { data };
};
