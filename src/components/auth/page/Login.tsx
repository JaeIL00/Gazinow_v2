import { useState } from 'react';
import { View } from 'react-native';

import { Input, NormalText, TextButton } from '@/components/common';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setForm((prev) => ({ ...prev, [type]: text }));
  };

  const submitForm = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  return (
    <View>
      <Input
        placeholder="이메일을 입력해주세요"
        value={form.email}
        onChangeText={(text) => changeFormText('email', text)}
        inputMode="email"
      />
      <Input
        placeholder="비밀번호를 입력해주세요"
        value={form.password}
        onChangeText={(text) => changeFormText('password', text)}
        secureTextEntry
      />
      <TextButton value="로그인" onPress={submitForm} />

      {isLoading && <NormalText value="로딩중" />}
    </View>
  );
};

export default Login;
