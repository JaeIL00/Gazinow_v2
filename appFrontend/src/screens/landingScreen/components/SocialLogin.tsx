import { View, Platform, TouchableOpacity } from 'react-native';
import LoginKakao from '@assets/icons/login_kakao.svg';
import LoginNaver from '@assets/icons/login_naver.svg';
import LoginApple from '@assets/icons/login_apple.svg';
import LoginGoogle from '@assets/icons/login_google.svg';
import { FontText } from '@/global/ui';
import { ReactNode } from 'react';
import cn from 'classname';

interface SocialLoginButtonProps {
  icon: ReactNode;
  label: string;
  bgColor: string;
  textColor?: string;
  onPress: () => void;
}

const SocialLoginButton = ({
  icon,
  label,
  bgColor,
  textColor,
  onPress,
}: SocialLoginButtonProps) => (
  <TouchableOpacity
    className={`flex-row justify-center items-center px-16 py-6 mb-12 rounded-30 ${bgColor}`}
    onPress={onPress}
  >
    {icon}
    <View className="flex-grow flex-row items-center justify-center pr-34">
      <FontText className={`${textColor}`} value={label} textSize="14px" textWeight="Medium" />
    </View>
  </TouchableOpacity>
);

const SocialLogin = () => (
  <View className={cn('mx-30 mb-18 items-center', { 'mb-8': Platform.OS !== 'ios' })}>
    <SocialLoginButton
      icon={<LoginKakao />}
      label="카카오로 계속하기"
      bgColor="bg-[#FEE500]"
      onPress={() => {
        return null;
      }}
    />
    <SocialLoginButton
      icon={<LoginNaver />}
      label="네이버로 계속하기"
      bgColor="bg-[#03C75A]"
      textColor="text-white"
      onPress={() => {
        return null;
      }}
    />
    {Platform.OS === 'ios' && (
      <SocialLoginButton
        icon={<LoginApple />}
        label="Apple로 계속하기"
        bgColor="bg-black"
        textColor="text-white"
        onPress={() => {
          return null;
        }}
      />
    )}
    <SocialLoginButton
      icon={<LoginGoogle />}
      label="구글로 계속하기"
      bgColor="bg-white"
      onPress={() => {
        return null;
      }}
    />
  </View>
);

export default SocialLogin;
