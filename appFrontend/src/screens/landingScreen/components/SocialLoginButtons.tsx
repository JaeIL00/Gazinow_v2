import React from 'react';
import { View, Platform, TouchableOpacity, Linking } from 'react-native';
import { FontText } from '@/global/ui';
import { API_BASE_URL } from '@env';

import LoginNaver from '@assets/icons/login_naver.svg';
import LoginApple from '@assets/icons/login_apple.svg';
import LoginGoogle from '@assets/icons/login_google.svg';
import { SvgProps } from 'react-native-svg';

const SOCIAL_LOGIN_BUTTONS = [
  {
    type: 'naver',
    icon: LoginNaver,
    label: '네이버로 계속하기',
    bgColor: 'bg-[#03C75A]',
    textColor: 'text-white',
  },
  {
    type: 'google',
    icon: LoginGoogle,
    label: '구글로 계속하기',
    bgColor: 'bg-white',
    textColor: 'text-black',
  },
  {
    type: 'apple',
    icon: LoginApple,
    label: 'Apple로 계속하기',
    bgColor: 'bg-black',
    textColor: 'text-white',
  },
];

interface SocialLoginButtonsProps {
  icon: React.FC<SvgProps>;
  label: string;
  bgColor: string;
  textColor: string;
  type: string;
}

const SocialLoginButton = ({
  icon: Icon,
  label,
  bgColor,
  textColor,
  type,
}: SocialLoginButtonsProps) => (
  <TouchableOpacity
    className={`flex-row items-center px-16 py-6 mb-12 rounded-30 ${bgColor}`}
    onPress={() => Linking.openURL(`${API_BASE_URL}/api/v1/oauth/login?socialLoginType=${type}`)}
  >
    <Icon />
    <View className="flex-grow items-center pr-34">
      <FontText className={textColor} value={label} textSize="14px" textWeight="Medium" />
    </View>
  </TouchableOpacity>
);

const SocialLoginButtons = () => (
  <View className="mx-30 mb-20 items-center">
    {SOCIAL_LOGIN_BUTTONS.map(
      (button) =>
        (Platform.OS === 'ios' || button.type !== 'apple') && (
          <SocialLoginButton key={button.type} {...button} />
        ),
    )}
  </View>
);

export default SocialLoginButtons;
