import { useState } from 'react';
import { View } from 'react-native';

import { Input, TextButton } from '@/global/ui';
import { setEncryptedStorage } from '@/global/utils';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SignInFormTypes } from './apis/entity';
import { useSignInMutation } from './apis/hook';

const initialFormState: SignInFormTypes = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const navigation = useRootNavigation();

  const { signInMutate } = useSignInMutation({
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setEncryptedStorage('access_token', accessToken);
      await setEncryptedStorage('refresh_token', refreshToken);
      navigation.replace('MainBottomTab', { screen: 'homeStack' });
    },
  });

  const [formData, setFormData] = useState<SignInFormTypes>(initialFormState);

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setFormData((prev) => ({ ...prev, [type]: text }));
  };

  const submitFormData = () => {
    signInMutate(formData);
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

export default SignInScreen;
