import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { subwayInfoFetch } from '@/apis/publicData';
import { SUBWAY_INFO_STORAGE_KEY } from '@/constants';
import { useAppDispatch } from '@/store';
import { getSubwayPublicData } from '@/store/modules';
import type { SubwayPublicDataTypes } from '@/types/apis';

const setInfoStorage = async (data: SubwayPublicDataTypes[]) => {
  try {
    const sortedArr = data.sort((a, b) =>
      a.STATION_NM < b.STATION_NM ? -1 : a.STATION_NM > b.STATION_NM ? 1 : 0,
    );
    const response = JSON.stringify(sortedArr);
    await AsyncStorage.setItem(SUBWAY_INFO_STORAGE_KEY, response);
  } catch (error) {
    // debug
    console.error('Failed subway info set storage ', error);
  }
};

export const useSubwayInfoQuery = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, refetch: subwayInfoFetching } = useQuery('subwayInfo', subwayInfoFetch, {
    enabled: false,
    onSuccess({ data }) {
      setInfoStorage(data.SearchSTNBySubwayLineInfo.row);
      dispatch(getSubwayPublicData(data.SearchSTNBySubwayLineInfo.row));
    },
    onError(error) {
      // debug
      console.error('Get failed subway info from Seoul public data ', error);
    },
  });

  return { isSuccess, subwayInfoFetching };
};
