import { useState } from 'react';
import { View } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

import { Input, NormalText, TextButton } from '@/components/common';
import { MAIN_BOTTOM_TAB, AUTH_STORAGE_KEY } from '@/constants';
import { useLoginMutation } from '@/hooks/queries';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getAccessToken } from '@/store/modules';
import type { LoginFetchResponse } from '@/types/apis';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useAppDispatch();
  const rootNavigation = useRootNavigation();

  const [formData, setFormData] = useState<typeof initialFormState>(initialFormState);

  const { isLoading, mutate: loginFetching } = useLoginMutation();

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setFormData((prev) => ({ ...prev, [type]: text }));
  };

  const setUserToken = async (data: LoginFetchResponse) => {
    try {
      const jsonData = JSON.stringify(data);
      await EncryptedStorage.setItem(AUTH_STORAGE_KEY, jsonData);
    } catch (error) {
      // debug
      console.error('Fail token set storage from login response');
    }
  };

  const loginSuccessHandler = async (data: LoginFetchResponse) => {
    await setUserToken(data);
    dispatch(getAccessToken(data.accessToken));
    rootNavigation.navigate(MAIN_BOTTOM_TAB);
  };

  const submitFormData = () => {
    loginFetching(formData, {
      onSuccess: ({ data }) => {
        loginSuccessHandler(data);
      },
      onError: (error) => {
        // debug
        console.error('Login fetching error ', error);
      },
    });
  };

  return (
    <View>
      <Input
        placeholder="이메일을 입력해주세요"
        value={formData.email}
        onChangeText={(text) => changeFormText('email', text)}
        inputMode="email"
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        value={formData.password}
        onChangeText={(text) => changeFormText('password', text)}
        secureTextEntry
      />
      <TextButton value="로그인" onPress={submitFormData} />

      {isLoading && <NormalText value="로딩중" />}
    </View>
  );
};

export default Login;
