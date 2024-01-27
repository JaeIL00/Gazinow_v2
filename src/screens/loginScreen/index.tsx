import { useState } from 'react';
import { View } from 'react-native';

import { Input, TextButton } from '@/global/ui';
import { LoginFormTypes } from '@/global/types/apis';
import { useLoginMutation } from '@/hooks';
import { setEncryptedStorage } from '@/global/utils';
import { useRootNavigation } from '@/navigation/RootNavigation';

const initialFormState: LoginFormTypes = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const navigation = useRootNavigation();

  const { loginMutate } = useLoginMutation({
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setEncryptedStorage('access_token', accessToken);
      await setEncryptedStorage('refresh_token', refreshToken);
      navigation.replace('MainBottomTab', { screen: 'Home' });
    },
  });

  const [formData, setFormData] = useState<LoginFormTypes>(initialFormState);

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setFormData((prev) => ({ ...prev, [type]: text }));
  };

  const submitFormData = () => {
    loginMutate(formData);
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
      <TextButton
        value="로그인"
        textSize="16px"
        textWeight="Regular"
        onPress={submitFormData}
        lineHeight="21px"
      />
    </View>
  );
};

export default LoginScreen;
