import { useRef, useState } from 'react';
import { Platform, SafeAreaView, StatusBar, TextInput, View } from 'react-native';

import { FontText, IconButton, Input, Space, TextButton } from '@/global/ui';
import { setEncryptedStorage } from '@/global/utils';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SignInFormTypes } from './apis/entity';
import { useSignInMutation } from './apis/hook';
import { COLOR } from '@/global/constants';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import CloseIcon from 'react-native-vector-icons/Ionicons';

const emailValidation = new RegExp(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
);

const initialFormState: SignInFormTypes = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const navigation = useRootNavigation();

  const StatusBarHeight =
    Platform.OS === 'ios' ? getStatusBarHeight(true) : (StatusBar.currentHeight as number);

  const { isLoading, signInMutate } = useSignInMutation({
    onSuccess: async ({ accessToken, refreshToken }) => {
      await setEncryptedStorage('access_token', accessToken);
      await setEncryptedStorage('refresh_token', refreshToken);
      navigation.reset({ routes: [{ name: 'MainBottomTab' }] });
    },
    onError: ({ status }) => {
      if (status === 401) setErrorMessage('비밀번호가 올바르지 않습니다');
      else setErrorMessage('이메일 또는 비밀번호를 확인해주세요');
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [formData, setFormData] = useState<SignInFormTypes>(initialFormState);

  const changeFormText = (type: 'email' | 'password', text: string) => {
    setFormData((prev) => ({ ...prev, [type]: text }));
    setErrorMessage('');

    if (type === 'email') {
      const isValid = emailValidation.test(text);
      setIsValidEmail(isValid);
    }
  };

  const submitFormData = () => {
    signInMutate(formData);
  };

  return (
    <View
      style={{
        paddingTop: Platform.OS === 'ios' ? 30 + StatusBarHeight : 30,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: COLOR.GRAY_F9,
      }}
    >
      <View style={{ marginBottom: 43 }}>
        <IconButton
          iconType="Ionicons"
          isFontIcon
          iconName="arrow-back-sharp"
          iconWidth="19.5"
          iconColor={COLOR.REAL_BLACK}
          onPress={() => navigation.goBack()}
        />
      </View>

      <FontText
        value="이메일로 로그인"
        textSize="24px"
        textWeight="Bold"
        textColor={COLOR.REAL_BLACK}
      />

      <Space height="75px" />

      <View style={{ flex: 1 }}>
        <FontText value="Email" textSize="14px" textWeight="Medium" textColor="#7c8183" />
        <View
          style={{
            backgroundColor: COLOR.GRAY_F2,
            height: 48,
            marginTop: 6,
            justifyContent: 'center',
            paddingLeft: 16,
            borderRadius: 5,
          }}
        >
          <Input
            value={formData.email}
            placeholder="이메일을 입력해주세요"
            placeholderTextColor={COLOR.GRAY_BE}
            fontSize="14px"
            onChangeText={(text) => changeFormText('email', text)}
            keyboardType="email-address"
            isBlur={isLoading}
          />
        </View>

        <Space height="20px" />

        <FontText value="Password" textSize="14px" textWeight="Medium" textColor="#7c8183" />
        <View
          style={{
            backgroundColor: COLOR.GRAY_F2,
            height: 48,
            marginTop: 6,
            justifyContent: 'center',
            paddingLeft: 16,
            borderRadius: 5,
          }}
        >
          <Input
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            placeholderTextColor={COLOR.GRAY_BE}
            fontSize="14px"
            onChangeText={(text) => changeFormText('password', text)}
            secureTextEntry
            isBlur={isLoading}
          />
        </View>

        {!!errorMessage && (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 9 }}>
            <CloseIcon name="close-circle-outline" size={14} color={COLOR.LIGHT_RED} />
            <Space width="3px" />
            <FontText
              value={errorMessage}
              textSize="12px"
              textWeight="Medium"
              textColor={COLOR.LIGHT_RED}
            />
          </View>
        )}
      </View>

      <TextButton
        value="로그인"
        textSize="16px"
        textWeight="Regular"
        textColor={COLOR.WHITE}
        onPress={submitFormData}
        disabled={!isValidEmail && !formData.password}
        style={{
          backgroundColor: isValidEmail && !!formData.password ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          height: 48,
          marginBottom: Platform.OS === 'ios' ? StatusBarHeight + 41 : 41,
        }}
      />
    </View>
  );
};

export default SignInScreen;
