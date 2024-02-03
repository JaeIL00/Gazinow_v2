import { ScrollView, View } from 'react-native';
import { FontText, Input, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import CheckIcon from 'react-native-vector-icons/Feather';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import { useCallback, useEffect, useState } from 'react';
import { useEmailConfirm } from '../apis/hooks';
import ConfirmEmailModal from './ConfirmEmailModal';
import BackgroundTimer from 'react-native-background-timer';
import useBackgroundInterval from '../hooks/useBackgroundInterval';

const combinationValidation = new RegExp(
  /^(?=.*[a-zA-Z])(?=.*[!~.,?@#$%^&()_/|;:'"<>*+=-])(?=.*[0-9])/,
);

interface PasswordStepProps {
  emailValue: string;
  passwordValue: string;
  setStep: () => void;
  changePasswordValue: (value: string) => void;
}

const PasswordStep = ({
  emailValue,
  passwordValue,
  changePasswordValue,
  setStep,
}: PasswordStepProps) => {
  const [isValueCombination, setIsValidCombination] = useState<boolean>(false);
  const [isValidLength, setIsValidLength] = useState<boolean>(false);

  const changeEmailHandler = (text: string) => {
    changePasswordValue(text);

    if (!text) return;
    const isCombination = combinationValidation.test(text);
    console.log({ isCombination });
    setIsValidCombination(isCombination);
    const isLength = text.length >= 8 && text.length <= 20;
    setIsValidLength(isLength);
  };

  const comValidColor = isValueCombination ? COLOR.LIGHT_GREEN : COLOR.GRAY_999;
  const lengValidColor = isValidLength ? COLOR.LIGHT_GREEN : COLOR.GRAY_999;
  return (
    <View style={{ flex: 1 }}>
      <View>
        <FontText
          value="회원가입"
          textSize="24px"
          textWeight="Bold"
          textColor={COLOR.BASIC_BLACK}
        />
        <Space height="10px" />
        <FontText
          value="비밀번호를 입력해주세요"
          textSize="13px"
          textWeight="Regular"
          textColor={COLOR.GRAY_999}
        />
      </View>

      <ScrollView style={{ marginTop: 51, flex: 1 }}>
        <FontText value="Email" textSize="14px" textWeight="Medium" textColor="#7C8183" />
        <View
          style={{
            height: 48,
            paddingHorizontal: 16,
            borderRadius: 5,
            backgroundColor: COLOR.GRAY_F2,
            justifyContent: 'center',
            marginTop: 6,
            marginBottom: 20,
          }}
        >
          <FontText
            value={emailValue}
            textSize="16px"
            textWeight="Medium"
            textColor={COLOR.BASIC_BLACK}
          />
        </View>
        <FontText value="Password" textSize="14px" textWeight="Medium" textColor="#7C8183" />
        <View
          style={{
            height: 48,
            paddingHorizontal: 16,
            borderRadius: 5,
            backgroundColor: COLOR.GRAY_F2,
            justifyContent: 'center',
            marginTop: 6,
          }}
        >
          <Input
            value={passwordValue}
            placeholder="비밀번호 입력"
            placeholderTextColor={COLOR.GRAY_BE}
            fontSize="16px"
            onChangeText={(text) => changeEmailHandler(text)}
            autoFocus
            secureTextEntry
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 9,
            marginTop: 8,
          }}
        >
          <CheckIcon name="check" size={12} color={lengValidColor} />
          <Space width="4px" />
          <FontText
            value="8자-20자 이내"
            textSize="12px"
            textWeight="Medium"
            textColor={lengValidColor}
          />
          <Space width="12px" />
          <CheckIcon name="check" size={12} color={comValidColor} />
          <Space width="4px" />
          <FontText
            value="영어, 숫자, 특수문자 포함"
            textSize="12px"
            textWeight="Medium"
            textColor={comValidColor}
          />
        </View>
        <Space height="40px" />
      </ScrollView>

      <TextButton
        value="회원가입"
        textSize="17px"
        textWeight="SemiBold"
        textColor={COLOR.WHITE}
        style={{
          backgroundColor: isValidLength && isValueCombination ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
          marginBottom: 24,
        }}
        onPress={setStep}
        disabled={!isValidLength || !isValueCombination}
      />
    </View>
  );
};

export default PasswordStep;
