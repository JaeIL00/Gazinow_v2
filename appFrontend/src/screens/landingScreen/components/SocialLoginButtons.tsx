import { View, Platform, TouchableOpacity, Linking } from 'react-native';
import LoginKakao from '@assets/icons/login_kakao.svg';
import LoginNaver from '@assets/icons/login_naver.svg';
import LoginApple from '@assets/icons/login_apple.svg';
import LoginGoogle from '@assets/icons/login_google.svg';
import { FontText } from '@/global/ui';
import { ReactNode } from 'react';
import cn from 'classname';
import { useAuthNavigation } from '@/navigation/AuthNavigation';
import { API_BASE_URL } from '@env';

export type SocialLoginType = 'naver' | 'google' | 'kakao' | 'apple';

interface SocialLoginButtonProps {
  icon: ReactNode;
  label: string;
  bgColor: string;
  textColor?: string;
  socialLoginTypeProps: SocialLoginType;
}

const SocialLoginButton = ({
  icon,
  label,
  bgColor,
  textColor,
  socialLoginTypeProps,
}: SocialLoginButtonProps) => {
  const authNavigation = useAuthNavigation();
  return (
    <TouchableOpacity
      className={`flex-row justify-center items-center px-16 py-6 mb-12 rounded-30 ${bgColor}`}
      onPress={() =>
        Linking.openURL(
          `${API_BASE_URL}/api/v1/oauth/login?socialLoginType=${socialLoginTypeProps}`,
        )
      }
    >
      {icon}
      <View className="flex-grow flex-row items-center justify-center pr-34">
        <FontText className={`${textColor}`} value={label} textSize="14px" textWeight="Medium" />
      </View>
    </TouchableOpacity>
  );
};

const SocialLoginButtons = () => {
  return (
    <View className={cn('mx-30 mb-18 items-center', { 'mb-8': Platform.OS !== 'ios' })}>
      <SocialLoginButton
        icon={<LoginKakao />}
        label="카카오로 계속하기"
        bgColor="bg-[#FEE500]"
        socialLoginTypeProps="kakao"
      />
      <SocialLoginButton
        icon={<LoginNaver />}
        label="네이버로 계속하기"
        bgColor="bg-[#03C75A]"
        textColor="text-white"
        socialLoginTypeProps="naver"
      />
      {Platform.OS === 'ios' && (
        <SocialLoginButton
          icon={<LoginApple />}
          label="Apple로 계속하기"
          bgColor="bg-black"
          textColor="text-white"
          socialLoginTypeProps="apple"
        />
      )}
      <SocialLoginButton
        icon={<LoginGoogle />}
        label="구글로 계속하기"
        bgColor="bg-white"
        socialLoginTypeProps="google"
      />
    </View>
  );
};

export default SocialLoginButtons;
