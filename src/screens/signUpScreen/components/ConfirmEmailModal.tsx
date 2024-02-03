import { COLOR } from '@/global/constants';
import { FontText, IconButton, Input, Space, TextButton } from '@/global/ui';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, View } from 'react-native';
import { TimerType } from './EmailStep';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import { useHomeNavigation } from '@/navigation/HomeNavigation';

interface ConfirmEmailModalProps {
  authNumber: string;
  timerValue: TimerType;
  closeModal: () => void;
  setStep: () => void;
  emailConfirmMutateHandler: () => void;
}

const ConfirmEmailModal = ({
  authNumber,
  timerValue,
  closeModal,
  setStep,
  emailConfirmMutateHandler,
}: ConfirmEmailModalProps) => {
  const [authNumberValue, setAuthNumberValue] = useState<string>('');
  const [isNotPass, setIsNotPass] = useState<boolean>(false);

  const freshTimerSeconds =
    timerValue.seconds < 10 ? `0${timerValue.seconds}` : timerValue.seconds + '';

  const changeValue = (value: string) => {
    setAuthNumberValue(value);
    setIsNotPass(false);
  };

  const checkAuthNumber = () => {
    if (authNumberValue === authNumber) setStep();
    else setIsNotPass(true);
  };

  return (
    <Modal
      visible
      onRequestClose={() => closeModal()}
      transparent
      statusBarTranslucent
      presentationStyle="overFullScreen"
      style={{ position: 'relative' }}
    >
      {/* 백그라운드 */}
      <View
        style={{
          backgroundColor: '#00000099',
          flex: 1,
          paddingTop: 32,
        }}
      >
        {/* 콘텐츠 */}
        <KeyboardAvoidingView
          behavior="padding"
          style={{
            borderTopStartRadius: 14,
            borderTopEndRadius: 14,
            backgroundColor: COLOR.WHITE,
            marginTop: 32,
            paddingTop: 32,
            paddingHorizontal: 16,
            flexGrow: 1,
          }}
        >
          <View style={{ marginBottom: 28 }}>
            <IconButton
              iconType="Ionicons"
              isFontIcon
              iconName="arrow-back-sharp"
              iconWidth="19.5"
              iconColor="#000"
              onPress={closeModal}
            />
          </View>

          <FontText
            value={`메일로 받은 인증번호를\n입력해주세요`}
            textSize="24px"
            textWeight="Bold"
            textColor={COLOR.BASIC_BLACK}
          />

          <Space height="57px" />

          <View style={{ flex: 1 }}>
            <View
              style={{
                backgroundColor: COLOR.GRAY_F2,
                paddingHorizontal: 16,
                height: 48,
                justifyContent: 'center',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Input
                value={authNumberValue}
                placeholder="인증번호 4자리"
                placeholderTextColor={COLOR.GRAY_BE}
                fontSize="14px"
                onChangeText={(value) => changeValue(value)}
                autoFocus
                keyboardType="number-pad"
                style={{ flex: 1 }}
                maxLength={4}
              />
              <FontText
                value={timerValue.minutes + ':' + freshTimerSeconds}
                textSize="13px"
                textWeight="Regular"
                textColor={COLOR.BASIC_BLACK}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10.17,
                marginTop: 7,
              }}
            >
              <CloseIcon
                name="close-circle-outline"
                size={14}
                color={isNotPass ? COLOR.LIGHT_RED : 'transparent'}
              />
              <Space width="3px" />
              <FontText
                value={
                  timerValue.minutes === 0 && timerValue.seconds === 0
                    ? '인증번호 만료시간이 지났습니다'
                    : '인증번호가 일치하지 않습니다'
                }
                textSize="12px"
                textWeight="Medium"
                textColor={isNotPass ? COLOR.LIGHT_RED : 'transparent'}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 34 }}>
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
                onPress={emailConfirmMutateHandler}
              />
            </View>
          </View>

          <TextButton
            value="입력완료"
            textSize="17px"
            textWeight="SemiBold"
            textColor={COLOR.WHITE}
            style={{
              backgroundColor: authNumberValue.length === 4 ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              height: 48,
              marginBottom: 24,
            }}
            onPress={checkAuthNumber}
            disabled={authNumberValue.length < 4}
          />
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;
