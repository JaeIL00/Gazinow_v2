import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { subwayInfoFetch } from '@/apis/publicData';
import { SUBWAY_INFO_STORAGE_KEY } from '@/constants';
import { useAppDispatch } from '@/store';
import { getSubwayPublicData } from '@/store/modules';
import type { SubwayPublicDataTypes } from '@/types/apis';

const setInfoStorage = async (data: SubwayPublicDataTypes[]) => {
  try {
    const response = JSON.stringify(data);
    await AsyncStorage.setItem(SUBWAY_INFO_STORAGE_KEY, response);
  } catch (error) {
    // debug
    console.error('Failed subway info set storage ', error);
  }
};

const remakeData = (data: SubwayPublicDataTypes[]) => {
  const sortedArr = data.sort((a, b) =>
    a.STATION_NM < b.STATION_NM ? -1 : a.STATION_NM > b.STATION_NM ? 1 : 0,
  );
  const lineNumFresh = sortedArr.map((info) => {
    const lineNumFirstZero = info.LINE_NUM.split('')[0] === '0';
    return {
      ...info,
      LINE_NUM: lineNumFirstZero ? info.LINE_NUM.replace('0', '') : info.LINE_NUM,
    };
  });
  return lineNumFresh;
};

export const useSubwayInfoQuery = () => {
  const dispatch = useAppDispatch();
  const { isSuccess, refetch: subwayInfoFetching } = useQuery('subwayInfo', subwayInfoFetch, {
    enabled: false,
    onSuccess({ data }) {
      const freshData = remakeData(data.SearchSTNBySubwayLineInfo.row);
      setInfoStorage(freshData);
      dispatch(getSubwayPublicData(freshData));
    },
    onError(error) {
      // debug
      console.error('Get failed subway info from Seoul public data ', error);
    },
  });

  return { isSuccess, subwayInfoFetching };
};
