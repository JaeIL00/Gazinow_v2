import { T_DATA_API_KEY } from '@env';

import { publicDataInstance } from '../axiosInstance';
import type { SubwayInfoResponse } from '@/types/apis';

export const subwayInfoFetch = async () => {
  return await publicDataInstance.get<SubwayInfoResponse>(
    `/apig/apiman-gateway/tapi/TaimsKsccDvSubwayStationGeom/1.0?apikey=${T_DATA_API_KEY}`,
  );
};
