import { COLOR } from '@/global/constants';
import { FontText, Input, TextButton } from '@/global/ui';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import { TimerType } from './EmailStep';
import IconXCircle from '@assets/icons/x-circle-standard.svg';
import StepButton from '../ui/StepButton';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import IconLeftArrow from '@assets/icons/left_arrow_round.svg';
import LoadingCircle from '@/global/components/animations/LoadingCircle';

interface ConfirmEmailModalProps {
  authNumber: string;
  timerValue: TimerType;
  closeModal: () => void;
  setStep: () => void;
  emailConfirmMutateHandler: () => void;
  isLoading: boolean;
}

const ConfirmEmailModal = ({
  authNumber,
  timerValue,
  closeModal,
  setStep,
  emailConfirmMutateHandler,
  isLoading,
}: ConfirmEmailModalProps) => {
  const StatusBarHeight = Platform.OS === 'ios' ? getStatusBarHeight(true) + 30 : 30;

  const animRef = useRef(new Animated.Value(500)).current;

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

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: StatusBarHeight,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal
      visible
      onRequestClose={() => closeModal()}
      transparent
      // statusBarTranslucent FIXME: 모달 풀화면 요구시 활성화
      // presentationStyle="overFullScreen" FIXME: 모달 풀화면 요구시 활성화
    >
      {/* 백그라운드 */}
      <View className="flex-1 bg-[#00000099]">
        {/* 콘텐츠 */}
        <KeyboardAvoidingView behavior="height" className="flex-1 justify-end">
          <Animated.View
            className="flex-1 bg-white pt-32 px-16"
            style={{
              borderTopStartRadius: 14,
              borderTopEndRadius: 14,
              paddingBottom: StatusBarHeight,
              transform: [{ translateY: animRef }],
            }}
          >
            <TouchableOpacity hitSlop={10} activeOpacity={1} className="mb-28" onPress={closeModal}>
              <IconLeftArrow color={COLOR.BASIC_BLACK} />
            </TouchableOpacity>

            <FontText
              value={`메일로 받은 인증번호를\n입력해주세요`}
              textSize="24px"
              textWeight="Bold"
              textColor={COLOR.BASIC_BLACK}
            />

            <View className="flex-1 mt-57">
              <View className="bg-gray-f2 px-16 py-13 justify-center rounded-5 flex-row items-center">
                <Input
                  value={authNumberValue}
                  placeholder="인증번호 4자리"
                  placeholderTextColor={COLOR.GRAY_BE}
                  fontSize="14px"
                  onChangeText={(value) => changeValue(value)}
                  keyboardType="number-pad"
                  className="flex-1 h-25"
                  maxLength={4}
                />
                <FontText
                  value={timerValue.minutes + ':' + freshTimerSeconds}
                  textSize="13px"
                  textWeight="Regular"
                  textColor={COLOR.BASIC_BLACK}
                />
              </View>

              <View className="flex-row items-center ml-[10.17] mt-7">
                {isNotPass && <IconXCircle width={14} height={14} />}
                <View className="w-3" />
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

              <View className="flex-row justify-center mt-34 items-start">
                <FontText
                  value="메일을 받지 못하셨나요?"
                  textSize="13px"
                  textWeight="Regular"
                  textColor={COLOR.GRAY_999}
                />
                <View className="w-8" />
                {isLoading ? (
                  <LoadingCircle color="gray" width={34} height={27} />
                ) : (
                  <TextButton
                    value="재전송"
                    textSize="13px"
                    textWeight="Bold"
                    textColor={COLOR.GRAY_999}
                    isTextUnderline
                    onPress={emailConfirmMutateHandler}
                  />
                )}
              </View>
            </View>

            <StepButton
              value="입력완료"
              backgroundCondition={authNumberValue.length === 4}
              onPress={checkAuthNumber}
              disabled={authNumberValue.length < 4}
            />
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default ConfirmEmailModal;
