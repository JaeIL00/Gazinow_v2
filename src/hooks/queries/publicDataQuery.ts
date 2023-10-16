import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { subwayInfoFetch } from '@/apis/publicData';
import { SUBWAY_INFO_STORAGE_KEY } from '@/constants';
import { useAppDispatch } from '@/store';
import { getPublicSubwayInfo } from '@/store/modules';
import { SubwayInfoResponse } from '@/types/apis';

const setInfoStorage = async (data: SubwayInfoResponse) => {
  try {
    const response = JSON.stringify(data);
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
      setInfoStorage(data);
      dispatch(getPublicSubwayInfo(data));
    },
    onError(error) {
      // debug
      console.error('Get failed subway info from Seoul public data ', error);
    },
  });

  return { isSuccess, subwayInfoFetching };
};
