import { IconButton } from '@/global/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { EmailStep } from './components';
import { SignUpParams } from '@/global/apis/entity';
import { COLOR } from '@/global/constants';

export type SignUpStepType = 'email' | 'password' | 'nickname' | 'complete';

const SignUpScreen = () => {
  const [step, setStep] = useState<SignUpStepType>('email');
  const [signUpData, setSignUpData] = useState<SignUpParams>({
    email: '',
    password: '',
    nickname: '',
  });

  const changeSignUpValue = (key: SignUpStepType, value: string) => {
    setSignUpData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View
      style={{ paddingTop: 30, paddingHorizontal: 16, flex: 1, backgroundColor: COLOR.GRAY_F9 }}
    >
      <View style={{ marginBottom: 43 }}>
        <IconButton
          iconType="Ionicons"
          isFontIcon
          iconName="arrow-back-sharp"
          iconWidth="19.5"
          iconColor="#000"
        />
      </View>

      {step === 'email' && (
        <EmailStep
          setStep={() => setStep('password')}
          emailValue={signUpData.email}
          changeEmailValue={(value: string) => changeSignUpValue('email', value)}
        />
      )}
      {step === 'password'}
      {step === 'nickname'}
      {step === 'complete'}
    </View>
  );
};

export default SignUpScreen;
