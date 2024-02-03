import { COLOR } from '@/global/constants';
import { FontText, IconButton, Input, Space } from '@/global/ui';
import { useState } from 'react';
import { Modal, View } from 'react-native';
import { TimerType } from './EmailStep';

interface ConfirmEmailModalProps {
  authNumber: string;
  timerValue: TimerType;
  closeModal: () => void;
  setStep: () => void;
}

const ConfirmEmailModal = ({
  authNumber,
  timerValue,
  closeModal,
  setStep,
}: ConfirmEmailModalProps) => {
  const [authNumberValue, setAuthNumberValue] = useState<string>('');

  const freshTimerSeconds =
    timerValue.seconds < 10 ? `0${timerValue.seconds}` : timerValue.seconds + '';

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
          justifyContent: 'flex-end',
        }}
      >
        {/* 콘텐츠 */}
        <View
          style={{
            borderTopStartRadius: 14,
            borderTopEndRadius: 14,
            backgroundColor: COLOR.WHITE,
            width: '100%',
            paddingTop: 32,
            paddingHorizontal: 16,
          }}
        >
          <View style={{ marginBottom: 28 }}>
            <IconButton
              iconType="Ionicons"
              isFontIcon
              iconName="arrow-back-sharp"
              iconWidth="19.5"
              iconColor="#000"
            />
          </View>

          <FontText
            value={`메일로 받은 인증번호를\n입력해주세요`}
            textSize="24px"
            textWeight="Bold"
            textColor={COLOR.BASIC_BLACK}
          />

          <Space height="57px" />

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
              placeholder="이메일(아이디)입력"
              placeholderTextColor={COLOR.GRAY_BE}
              fontSize="14px"
              // onChangeText={(text) => changeEmailHandler(text)}
              autoFocus
              keyboardType="number-pad"
              style={{ flex: 1 }}
            />
            <FontText
              value={timerValue.minutes + ':' + freshTimerSeconds}
              textSize="13px"
              textWeight="Regular"
              textColor={COLOR.BASIC_BLACK}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;
