import { useState } from 'react';
import { View } from 'react-native';

import { Input, TextButton } from '@/components/common';

const initialFormState = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initialFormState);

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setForm((prev) => ({ ...prev, [type]: text }));
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
      <TextButton value="로그인" />
    </View>
  );
};

export default Login;
