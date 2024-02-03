import { View } from 'react-native';
import type { SignUpStepType } from '..';
import { FontText, Input, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import CheckIcon from 'react-native-vector-icons/Feather';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import { useCallback, useState } from 'react';
import { useEmailConfirm } from '../apis/hooks';
import ConfirmEmailModal from './ConfirmEmailModal';
import BackgroundTimer from 'react-native-background-timer';
import useBackgroundInterval from '../hooks/useBackgroundInterval';

const emailValidation = new RegExp(
  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
);

export interface TimerType {
  minutes: number;
  seconds: number;
}

interface EmailStepProps {
  emailValue: string;
  setStep: () => void;
  changeEmailValue: (value: string) => void;
}

const EmailStep = ({ emailValue, setStep, changeEmailValue }: EmailStepProps) => {
  const { authNumber, emailConfirmMutate } = useEmailConfirm({
    onSuccess: () => {
      setIsSuccess(true);
      setIsOpenConfirmModal(true);
    },
  });

  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(false);
  const [isOpenConfirmModal, setIsOpenConfirmModal] = useState<boolean>(false);
  const [timer, setTimer] = useState<TimerType>({
    minutes: 5,
    seconds: 0,
  });

  const changeEmailHandler = (text: string) => {
    changeEmailValue(text);

    if (!text) return;
    const isValid = emailValidation.test(text);
    setIsValidEmail(isValid);
    setIsSuccess(false);
  };

  const closeModal = () => setIsOpenConfirmModal(false);

  const timerHandler = useCallback(() => {
    if (timer.seconds > 0) {
      setTimer((prev) => ({ ...prev, seconds: prev.seconds - 1 }));
    } else if (timer.seconds === 0) {
      setTimer((prev) => ({ minutes: prev.minutes - 1, seconds: 59 }));
    }
  }, [timer.seconds]);

  useBackgroundInterval(timerHandler, 1000);

  return (
    <>
      {isOpenConfirmModal && authNumber && (
        <ConfirmEmailModal
          authNumber={authNumber}
          timerValue={timer}
          closeModal={closeModal}
          setStep={setStep}
        />
      )}
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 51 }}>
          <FontText
            value="회원가입"
            textSize="24px"
            textWeight="Bold"
            textColor={COLOR.BASIC_BLACK}
          />
          <Space height="10px" />
          <FontText
            value="본인인증을 위한 이메일을 입력해주세요"
            textSize="13px"
            textWeight="Regular"
            textColor={COLOR.GRAY_999}
          />
        </View>

        <View style={{ flex: 1 }}>
          <FontText value="Email" textSize="14px" textWeight="Medium" textColor="#7c8183" />
          <View
            style={{
              backgroundColor: COLOR.GRAY_F2,
              height: 48,
              marginTop: 6,
              marginBottom: 8,
              justifyContent: 'center',
              paddingLeft: 16,
              borderRadius: 5,
            }}
          >
            <Input
              value={emailValue}
              placeholder="이메일(아이디)입력"
              placeholderTextColor={COLOR.GRAY_BE}
              fontSize="14px"
              onChangeText={(text) => changeEmailHandler(text)}
              autoFocus
              keyboardType="email-address"
            />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 9 }}>
            {isValidEmail ? (
              <>
                <CheckIcon name="check" size={14} color={COLOR.LIGHT_GREEN} />
                <Space width="3px" />
                <FontText
                  value="올바른 이메일 형식입니다"
                  textSize="12px"
                  textWeight="Medium"
                  textColor={COLOR.LIGHT_GREEN}
                />
              </>
            ) : (
              <>
                {emailValue && (
                  <>
                    <CloseIcon name="close-circle-outline" size={14} color={COLOR.LIGHT_RED} />
                    <Space width="3px" />
                    <FontText
                      value="이메일 형식이 올바르지 않습니다"
                      textSize="12px"
                      textWeight="Medium"
                      textColor={COLOR.LIGHT_RED}
                    />
                  </>
                )}
              </>
            )}
          </View>
        </View>

        <TextButton
          value={isValidEmail ? '이메일 인증' : '이메일을 입력해주세요'}
          textSize="17px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
          style={{
            backgroundColor: isValidEmail ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
            borderRadius: 5,
            alignItems: 'center',
            paddingVertical: 10,
            marginBottom: 24,
          }}
          onPress={() => emailConfirmMutate(emailValue)}
          disabled={!isValidEmail}
        />
        {isSuccess && (
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 36 }}>
            <FontText
              value="메일을 받지 못하셨나요?"
              textSize="13px"
              textWeight="Regular"
              textColor={COLOR.GRAY_999}
            />
            <Space width="8px" />
            <TextButton
              value="재전송"
              textSize="13px"
              textWeight="Bold"
              textColor={COLOR.GRAY_999}
              isTextUnderline
              onPress={() => emailConfirmMutate(emailValue)}
            />
          </View>
        )}
      </View>
    </>
  );
};

export default EmailStep;
