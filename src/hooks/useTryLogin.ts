import EncryptedStorage from 'react-native-encrypted-storage';

import { AUTH_STORAGE_KEY, MAIN_BOTTOM_TAB } from '@/constants';
import { useAutoLoginMutation, useLoginMutation } from '@/hooks/queries';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getAccessToken } from '@/store/modules';
import type { LoginFetchResponse, LoginFormTypes, TokenTypes } from '@/types/apis';

const getTokenStorage = async () => {
  try {
    const token = await EncryptedStorage.getItem(AUTH_STORAGE_KEY);
    return token ? JSON.parse(token) : token;
  } catch (error) {
    // debug
    console.error('Failed token get storage from login feature');
  }
};

const setTokenStorage = async (data: TokenTypes) => {
  try {
    const jsonData = JSON.stringify(data);
    await EncryptedStorage.setItem(AUTH_STORAGE_KEY, jsonData);
  } catch (error) {
    // debug
    console.error('Failed token set storage from login response');
  }
};

const useTryLogin = () => {
  const dispatch = useAppDispatch();
  const rootNavigation = useRootNavigation();

  const { autoLoginFetching } = useAutoLoginMutation();
  const { loginFetching } = useLoginMutation();

  const loginSuccessHandler = async (data: LoginFetchResponse) => {
    await setTokenStorage(data);
    dispatch(getAccessToken(data.accessToken));
    rootNavigation.navigate(MAIN_BOTTOM_TAB);
  };

  const tryLogin = async (type: 'auto' | 'submit', formData?: LoginFormTypes) => {
    if (type === 'auto') {
      const token = await getTokenStorage();
      if (!token) return;
      autoLoginFetching(token, {
        onSuccess: ({ data }) => {
          loginSuccessHandler(data);
        },
        onError: (error) => {
          // debug
          console.error('Auto login fetching error ', error);
        },
      });
    } else if (type === 'submit' && formData) {
      loginFetching(formData, {
        onSuccess: ({ data }) => {
          loginSuccessHandler(data);
        },
        onError: (error) => {
          // debug
          console.error('Login fetching error ', error);
        },
      });
    }
  };

  return tryLogin;
};

export default useTryLogin;
