import React, { useEffect } from 'react';
import { Linking } from 'react-native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getAuthorizationState, saveUserInfo } from '@/store/modules';
import { setEncryptedStorage } from '@/global/utils';
import messaging from '@react-native-firebase/messaging';
import SocialLoginButtons from './SocialLoginButtons';
import { showToast } from '@/global/utils/toast';
import { sendFirebaseTokenFetch } from '../apis/func';
import { AxiosError } from 'axios';
import { useMutation } from 'react-query';

const SocialLogin = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();

  const { mutate: sendFirebaseTokenMutate } = useMutation(sendFirebaseTokenFetch, {
    onSuccess: () => {
      navigation.reset({ routes: [{ name: 'MainBottomTab' }] });
      showToast('socialLoginSuccess');
    },
    onError: () => {
      showToast('socialLoginFailed');
    },
  });

  useEffect(() => {
    // 외부 브라우저에서 소셜로그인 성공 시 앱으로 이동 후 url에 담긴 정보로 로그인 처리
    const handleSocialLogin = async ({ url }: { url: string }) => {
      // url 파싱 (accesstoken, 이메일, 닉네임 값)
      const parseUrlParams = (url: string): Record<string, string> => {
        const params: Record<string, string> = {};
        const queryString = url.split('?')[1];

        if (queryString) {
          const pairs = queryString.split('&');
          for (const pair of pairs) {
            const [key, value] = pair.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value);
          }
        }

        return params;
      };

      const params = parseUrlParams(url);
      dispatch(saveUserInfo({ nickname: params.nickName, email: params.email }));
      dispatch(getAuthorizationState('success auth'));
      await setEncryptedStorage('access_token', params.accessToken);
      await setEncryptedStorage('refresh_token', params.refreshToken);

      // 닉네임, 이메일, 토큰 저장했으면 파이어베이스 토큰을 서버에 전송
      const firebaseToken = await messaging().getToken();
      sendFirebaseTokenMutate({ email: params.email, firebaseToken });
    };

    Linking.addEventListener('url', handleSocialLogin);
    return () => Linking.removeAllListeners('url');
  }, [dispatch, sendFirebaseTokenMutate]);

  return <SocialLoginButtons />;
};

export default SocialLogin;
