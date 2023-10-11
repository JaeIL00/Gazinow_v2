import EncryptedStorage from 'react-native-encrypted-storage';

import { AUTH_STORAGE_KEY, MAIN_BOTTOM_TAB } from '@/constants';
import { useAutoLoginMutation } from '@/hooks/queries';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getAccessToken } from '@/store/modules';
import type { LoginFetchResponse, TokenTypes } from '@/types/apis';

const checkPreviousToken = async () => {
  try {
    const token = await EncryptedStorage.getItem(AUTH_STORAGE_KEY);
    return token ? JSON.parse(token) : token;
  } catch (error) {
    // debug
    console.error('Fail token get storage from auto login feature');
  }
};

const useTryAutoLogin = () => {
  const dispatch = useAppDispatch();
  const rootNavigation = useRootNavigation();

  const { autoLoginFetching } = useAutoLoginMutation();

  const setUserToken = async (data: TokenTypes) => {
    try {
      const jsonData = JSON.stringify(data);
      await EncryptedStorage.setItem(AUTH_STORAGE_KEY, jsonData);
    } catch (error) {
      // debug
      console.error('Fail token set storage from auto login response');
    }
  };

  const loginSuccessHandler = async (data: LoginFetchResponse) => {
    await setUserToken(data);
    dispatch(getAccessToken(data.accessToken));
    rootNavigation.navigate(MAIN_BOTTOM_TAB);
  };

  const tryAutoLogin = async () => {
    const token = await checkPreviousToken();
    if (!token) return;
    autoLoginFetching(token, {
      onSuccess: ({ data }) => {
        loginSuccessHandler(data);
      },
      onError: (error) => {
        // debug
        console.error('Login fetching error ', error);
      },
    });
  };

  return tryAutoLogin;
};

export default useTryAutoLogin;
