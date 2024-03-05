import { tokenReissueFetch } from '@/global/apis/func';
import { getEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { useAppDispatch } from '@/store';
import { saveUserInfo } from '@/store/modules';
import { useState } from 'react';
import { useMutation } from 'react-query';

export const useTryAuthorization = () => {
  const dispatch = useAppDispatch();

  const [authState, setAuthState] = useState<'success auth' | 'fail auth' | 'yet'>('yet');

  const { mutate } = useMutation(tokenReissueFetch, {
    onSuccess: async (data) => {
      dispatch(saveUserInfo({ nickname: data.nickName, email: data.email }));
      await setEncryptedStorage('access_token', data.accessToken);
      await setEncryptedStorage('refresh_token', data.refreshToken);
      setAuthState('success auth');
    },
    onError: () => {
      removeEncryptedStorage('access_token');
      removeEncryptedStorage('refresh_token');
      setAuthState('fail auth');
    },
  });

  const tryAuthorization = async () => {
    const accessToken = await getEncryptedStorage('access_token');
    const refreshToken = await getEncryptedStorage('refresh_token');
    if (!accessToken) {
      setAuthState('fail auth');
      return;
    } else {
      mutate({
        accessToken,
        refreshToken,
      });
    }
  };

  return {
    authState,
    tryAuthorization,
  };
};
