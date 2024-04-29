import { useCallback, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useRootNavigation } from '@/navigation/RootNavigation';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { removeEncryptedStorage } from '@/global/utils';
import { debounce } from 'lodash';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';
import { showToast } from '@/global/utils/toast';
import { useCheckPasswordMutation, useDeleteAccountMutation } from '../apis/hooks';
import * as Sentry from '@sentry/react-native';
import cn from 'classname';

const ConfirmPwScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  const navigation = useRootNavigation();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isPwRight, setIsPwRight] = useState<boolean>(false);

  const { deleteAccountMutate } = useDeleteAccountMutation({
    onSuccess: () => {
      Sentry.captureMessage('유저가 탈퇴했어요');
      removeEncryptedStorage('access_token');
      removeEncryptedStorage('refresh_token');
      navigation.reset({ routes: [{ name: 'MainBottomTab' }] });
      showToast('quit');
    },
    onError: () => {
      Alert.alert('회원 탈퇴 오류', '탈퇴에 실패했습니다\n다시 시도해주세요');
    },
  });

  const checkPasswordDebounce = useCallback(
    debounce((curPassword: string) => {
      checkPasswordMutate(curPassword);
    }, 300),
    [],
  );

  const handleCurPasswordChange = (curPassword: string) => {
    setPasswordInput(curPassword);
    checkPasswordDebounce(curPassword);
  };

  const { checkPasswordMutate } = useCheckPasswordMutation({
    onSuccess: () => {
      setIsPwRight(true);
    },
    onError: () => {
      setIsPwRight(false);
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 px-16">
          <TouchableOpacity
            className="pl-4 h-56 items-center flex-row"
            onPress={() => myPageNavigation.goBack()}
          >
            <IconLeftArrowHead color="#3F3F46" />
          </TouchableOpacity>

          <View className="flex-1 bg-white">
            <View className="pt-43 pb-29 gap-20">
              <FontText
                value="비밀번호 입력"
                textSize="24px"
                textWeight="SemiBold"
                lineHeight="35px"
              />
              <FontText
                value="탈퇴를 위해 비밀번호를 입력해주세요."
                textSize="16px"
                textWeight="Regular"
                lineHeight="21px"
              />
            </View>

            <FontText
              value="Password"
              textSize="14px"
              textWeight="Medium"
              lineHeight="21px"
              textColor="#7C8183 "
            />

            <Input
              className="px-16 py-12 my-7 rounded-5 bg-gray-f2"
              placeholder="비밀번호를 입력해주세요"
              value={passwordInput}
              onChangeText={(text) => handleCurPasswordChange(text)}
              inputMode="text"
              placeholderTextColor={COLOR.GRAY_999}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            className={cn('py-11 mb-40 rounded-5 items-center', {
              'bg-black-17': isPwRight,
              'bg-gray-dd': !isPwRight,
            })}
            onPress={() => deleteAccountMutate()}
            disabled={!isPwRight}
          >
            <FontText
              value="탈퇴하기"
              textSize="17px"
              textWeight="SemiBold"
              textColor={COLOR.WHITE}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
export default ConfirmPwScreen;
