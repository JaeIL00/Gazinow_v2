import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Input } from '@/components/common/atoms';
import { TextButton } from '@/components/common/molecules';
import { useTryLogin } from '@/hooks';
import { LoginFormTypes } from '@/types/apis';

const initialFormState: LoginFormTypes = {
  email: '',
  password: '',
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormTypes>(initialFormState);

  const tryLogin = useTryLogin();

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setFormData((prev) => ({ ...prev, [type]: text }));
  };

  const submitFormData = () => {
    tryLogin('submit', formData);
  };

  useEffect(() => {
    tryLogin('auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </View>
  );
};

export default LoginPage;
