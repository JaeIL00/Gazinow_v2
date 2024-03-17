import { API_BASE_URL } from '@env';
import axios, { AxiosError } from 'axios';

import { createNavigationContainerRef } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types/navigation';
import { getEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { SIGNIN } from '@/global/constants';
import EncryptedStorage from 'react-native-encrypted-storage';
import { tokenReissueFetch } from './func';

const navigationRef = createNavigationContainerRef<RootStackParamList>();

const navigate = (name: any, params?: any): any => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};

/**
 * 유저 토큰이 불필요한 api instance
 */
export const publicServiceAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

/**
 * header token 포함하는 instance
 * 닉네임 수정
 * 비밀번호 변경
 * 회원 탈퇴
 * 로그아웃
 * 토큰 재발급
 * 도움돼요 추가,삭제
 * 지하철역 최근검색 조회, 저장
 * 내 저장경로 조회,저장,삭제
 */
export const authServiceAPI = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

authServiceAPI.interceptors.request.use(async (requestConfig) => {
  const token = await getEncryptedStorage('access_token');
  requestConfig.headers.Authorization = `Bearer ${token}`;

  return requestConfig;
});

authServiceAPI.interceptors.response.use(
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
      return navigate(SIGNIN);
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

    const { accessToken: newAccessToken } = await tokenReissueFetch({
      accessToken,
      refreshToken,
    });

    if (response.status === 200) {
      // refresh token is valid
      await setEncryptedStorage('access_token', newAccessToken);
      return authServiceAPI(error.config || {});
    } else {
      // refresh token is not valid
      await EncryptedStorage.removeItem('access_token');
      await EncryptedStorage.removeItem('refresh_token');
      return navigate(SIGNIN);
    }
  },
);
