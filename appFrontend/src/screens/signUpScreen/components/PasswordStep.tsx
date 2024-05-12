import { ScrollView, View } from 'react-native';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import IconCheck from '@assets/icons/check.svg';
import { useState } from 'react';

import SubscribeTermsModal from './SubscribeTermsModal';
import StepButton from '../ui/StepButton';

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
  const [isTermsOpenModal, setIsTermsOpenModal] = useState<boolean>(false);
  const [isValueCombination, setIsValidCombination] = useState<boolean>(false);
  const [isValidLength, setIsValidLength] = useState<boolean>(false);

  const changeEmailHandler = (text: string) => {
    changePasswordValue(text);

    if (!text) return;
    const isCombination = combinationValidation.test(text);
    setIsValidCombination(isCombination);
    const isLength = text.length >= 8 && text.length <= 20;
    setIsValidLength(isLength);
  };

  const comValidColor = isValueCombination ? COLOR.LIGHT_GREEN : COLOR.GRAY_999;
  const lengValidColor = isValidLength ? COLOR.LIGHT_GREEN : COLOR.GRAY_999;

  const closeModal = () => setIsTermsOpenModal(false);
  return (
    <>
      {isTermsOpenModal && <SubscribeTermsModal setStep={setStep} closeModal={closeModal} />}
      <View className="flex-1">
        <View className="gap-10">
          <FontText
            value="회원가입"
            textSize="24px"
            textWeight="Bold"
            textColor={COLOR.BASIC_BLACK}
          />
          <FontText
            value="비밀번호를 입력해주세요"
            textSize="13px"
            textWeight="Regular"
            textColor={COLOR.GRAY_999}
          />
        </View>

        <ScrollView className="flex-1 mt-51">
          <FontText value="Email" textSize="14px" textWeight="Medium" textColor="#7C8183" />
          <View className="h-48 px-16 rounded-5 bg-gray-f2 justify-center mt-6 mb-20">
            <FontText
              value={emailValue}
              textSize="16px"
              textWeight="Medium"
              textColor={COLOR.BASIC_BLACK}
            />
          </View>
          <FontText value="Password" textSize="14px" textWeight="Medium" textColor="#7C8183" />
          <View className="px-16 py-13 rounded-5 bg-gray-f2 justify-center mt-6">
            <Input
              value={passwordValue}
              placeholder="비밀번호 입력"
              placeholderTextColor={COLOR.GRAY_BE}
              fontSize="16px"
              onChangeText={(text) => changeEmailHandler(text)}
              secureTextEntry
              className="h-25"
            />
          </View>
          <View className="flex-row items-center ml-9 mt-8 mb-40">
            <IconCheck width={12} height={12} color={lengValidColor} />
            <FontText
              value="8자-20자 이내"
              textSize="12px"
              textWeight="Medium"
              textColor={lengValidColor}
              className="ml-4 mr-12"
            />
            <IconCheck width={12} height={12} color={comValidColor} />
            <FontText
              value="영어, 숫자, 특수문자 포함"
              textSize="12px"
              textWeight="Medium"
              textColor={comValidColor}
              className="mr-12"
            />
          </View>
        </ScrollView>

        <StepButton
          value="회원가입"
          backgroundCondition={isValidLength && isValueCombination}
          onPress={() => setIsTermsOpenModal(true)}
          disabled={!isValidLength || !isValueCombination}
        />
      </View>
    </>
  );
};

export default PasswordStep;
