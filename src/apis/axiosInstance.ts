import { API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/types/navigation';

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
  const token = await AsyncStorage.getItem('access_token');

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
    const refreshToken = await AsyncStorage.getItem('refresh_token');

    if (!refreshToken) {
      return navigate('Login');
    }

    const response = await axios.post('api/v1/member/reissue', null, {
      baseURL: API_BASE_URL,
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (response.status === 200) {
      // refresh token is valid
      AsyncStorage.setItem('access_token', response.data.access_token);
      return axiosInstance(error.config || {});
    } else {
      // refresh token is not valid
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      return navigate('Login');
    }
  },
);
