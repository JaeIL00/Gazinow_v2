import { API_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/global/types/navigation';
import { getEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { LOGIN } from '@/global/constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import { tokenReissueFetch } from './auth';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: any, params?: any): any => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (requestConfig) => {
  const token = await getEncryptedStorage('access_token');
  requestConfig.headers.Authorization = `Bearer ${token}`;

  return requestConfig;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // network error
    if (!error.response || error.response.status !== 401) {
      throw error;
    }

    // access token is not valid
    const accessToken = await getEncryptedStorage('access_token');
    const refreshToken = await getEncryptedStorage('refresh_token');

    if (!refreshToken) {
      return navigate(LOGIN);
    }

    const response = await axios.post(
      'api/v1/member/reissue',
      {
        accessToken,
        refreshToken,
      },
      {
        baseURL: API_BASE_URL,
        headers: { Authorization: `Bearer ${refreshToken}` },
      },
    );

    const { newAccessToken } = await tokenReissueFetch({
      accessToken,
      refreshToken,
    });

    if (response.status === 200) {
      // refresh token is valid
      await setEncryptedStorage('access_token', newAccessToken);
      return axiosInstance(error.config || {});
    } else {
      // refresh token is not valid
      await EncryptedStorage.removeItem('access_token');
      await EncryptedStorage.removeItem('refresh_token');
      return navigate(LOGIN);
    }
  },
);
