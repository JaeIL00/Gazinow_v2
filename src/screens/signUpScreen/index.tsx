import { IconButton } from '@/global/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { CompleteStep, EmailStep, NicknameStep, PasswordStep } from './components';
import { COLOR } from '@/global/constants';
import { SignUpParams, SignUpStepType } from './type';
import { useRootNavigation } from '@/navigation/RootNavigation';

const SignUpScreen = () => {
  const navigation = useRootNavigation();

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

  const backStepHandler = () => {
    switch (step) {
      case 'email':
        // navigation.reset({routes: [{name:  초기화면으로 이동}]}) FIXME: 비로그인 홈으로 이동
        break;
      case 'password':
        setStep('email');
        break;
      case 'nickname':
        setStep('password');
        break;
      default:
        break;
    }
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
          iconColor={step === 'complete' ? 'transparent' : '#000'}
          onPress={backStepHandler}
          disabled={step === 'complete'}
        />
      </View>

      {step === 'email' && (
        <EmailStep
          setStep={() => setStep('password')}
          emailValue={signUpData.email}
          changeEmailValue={(value: string) => changeSignUpValue('email', value)}
        />
      )}
      {step === 'password' && (
        <PasswordStep
          emailValue={signUpData.email}
          passwordValue={signUpData.password}
          changePasswordValue={(value: string) => changeSignUpValue('password', value)}
          setStep={() => setStep('nickname')}
        />
      )}
      {step === 'nickname' && (
        <NicknameStep
          nicknameValue={signUpData.nickname}
          signUpData={signUpData}
          changeNicknameValue={(value: string) => changeSignUpValue('nickname', value)}
          setStep={() => setStep('complete')}
        />
      )}
      {step === 'complete' && <CompleteStep />}
    </View>
  );
};

export default SignUpScreen;
