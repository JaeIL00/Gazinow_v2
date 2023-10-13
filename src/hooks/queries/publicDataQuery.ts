import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from 'react-query';

import { subwayInfoFetch } from '@/apis/publicData';
import { SUBWAY_INFO_STORAGE_KEY } from '@/constants';
import { SubwayInfoResponse } from '@/types/apis';

const setInfoStorage = async (data: SubwayInfoResponse) => {
  try {
    const response = JSON.stringify(data);
    await AsyncStorage.setItem(SUBWAY_INFO_STORAGE_KEY, response);
  } catch (error) {
    // debug
    console.error('Failed subway info set storage');
  }
};

export const useSubwayInfoQuery = () => {
  const { isSuccess } = useQuery('subwayInfo', subwayInfoFetch, {
    onSuccess({ data }) {
      setInfoStorage(data);
    },
    onError(error) {
      // debug
      console.error('Get failed subway info from Seoul public data ', error);
    },
  });

  return { isSuccess };
};
