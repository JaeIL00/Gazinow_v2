import { SEOUL_PUBLIC_API_KEY } from '@env';

import { publicDataInstance } from '../axiosInstance';
import type { SubwayInfoResponse } from '@/types/apis';

const START_INDEX = 1;
const END_INDEX = 1000;

export const subwayInfoFetch = async () => {
  const asdf = await publicDataInstance.get<SubwayInfoResponse>(
    `/${SEOUL_PUBLIC_API_KEY}/json/SearchSTNBySubwayLineInfo/${START_INDEX}/${END_INDEX}`,
  );
  return asdf;
};
