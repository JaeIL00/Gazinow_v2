import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import { FontText, Input, Space, TextButton } from '@/global/ui';
import { getEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { SignInFormTypes } from './apis/entity';
import { useSignInMutation } from './apis/hooks';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getAuthorizationState, saveUserInfo } from '@/store/modules';
import IconXCircle from '@assets/icons/x-circle-standard.svg';
import IconLeftArrow from '@assets/icons/left_arrow_round.svg';
import messaging from '@react-native-firebase/messaging';

const emailValidation = new RegExp(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
);

const initialFormState: SignInFormTypes = {
  email: '',
  password: '',
};

const SignInScreen = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();

  const { isLoading, signInMutate } = useSignInMutation({
    onSuccess: async (data) => {
      dispatch(saveUserInfo({ nickname: data.nickName, email: data.email }));
      dispatch(getAuthorizationState('success auth'));
      await setEncryptedStorage('access_token', data.accessToken);
      await setEncryptedStorage('refresh_token', data.refreshToken);
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

  const submitFormData = async () => {
    const accessToken = await getEncryptedStorage('access_token');

    if (accessToken === null) {
      const firebaseToken = await messaging().getToken();
      signInMutate({ ...formData, firebaseToken });
    } else {
      signInMutate(formData);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <KeyboardAvoidingView
        style={{ paddingHorizontal: 16, flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <TouchableOpacity
          hitSlop={10}
          activeOpacity={1}
          style={{ marginBottom: 43, marginTop: 30 }}
          onPress={() => navigation.goBack()}
        >
          <IconLeftArrow color={COLOR.BASIC_BLACK} />
        </TouchableOpacity>

        <FontText
          value="이메일로 로그인"
          textSize="24px"
          textWeight="Bold"
          textColor={COLOR.REAL_BLACK}
        />

        <Space height="75px" />

        <ScrollView style={{ flex: 1 }}>
          <FontText value="Email" textSize="14px" textWeight="Medium" textColor="#7c8183" />
          <View
            style={{
              backgroundColor: COLOR.GRAY_F2,
              marginTop: 6,
              paddingVertical: 13,
              justifyContent: 'center',
              paddingLeft: 16,
              borderRadius: 5,
            }}
          >
            <Input
              value={formData.email}
              placeholder="이메일을 입력해주세요"
              placeholderTextColor={COLOR.GRAY_BE}
              fontSize="16px"
              onChangeText={(text) => changeFormText('email', text)}
              keyboardType="email-address"
              isBlur={isLoading}
              textContentType="oneTimeCode"
              style={{ height: 25 }}
            />
          </View>

          <Space height="20px" />

          <FontText value="Password" textSize="14px" textWeight="Medium" textColor="#7c8183" />
          <View
            style={{
              backgroundColor: COLOR.GRAY_F2,
              marginTop: 6,
              paddingVertical: 13,
              justifyContent: 'center',
              paddingLeft: 16,
              borderRadius: 5,
            }}
          >
            <Input
              placeholder="비밀번호를 입력해주세요"
              value={formData.password}
              placeholderTextColor={COLOR.GRAY_BE}
              fontSize="16px"
              onChangeText={(text) => changeFormText('password', text)}
              secureTextEntry
              isBlur={isLoading}
              style={{ height: 25 }}
            />
          </View>

          {!!errorMessage && (
            <View
              style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 9 }}
            >
              <IconXCircle width={14} height={14} />
              <Space width="3px" />
              <FontText
                value={errorMessage}
                textSize="12px"
                textWeight="Medium"
                textColor={COLOR.LIGHT_RED}
              />
            </View>
          )}
        </ScrollView>

        <TextButton
          value="로그인"
          textSize="16px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
          onPress={submitFormData}
          disabled={!isValidEmail || !formData.password}
          style={{
            backgroundColor:
              isValidEmail && !!formData.password ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            height: 48,
            marginBottom: 20,
          }}
        />
      </KeyboardAvoidingView>

      <Space height="20px" />
    </SafeAreaView>
  );
};

export default SignInScreen;
