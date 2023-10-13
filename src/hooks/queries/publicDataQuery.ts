import { useQuery } from 'react-query';

import { subwayInfoFetch } from '@/apis/publicData';

export const useSubwayInfoQuery = () => {
  const { isSuccess } = useQuery('subwayInfo', subwayInfoFetch, {
    onSuccess({ data }) {},
    onError(error) {
      // debug
      console.error('Get failed subway info from Seoul public data ', error);
    },
  });

  return { isSuccess };
};
