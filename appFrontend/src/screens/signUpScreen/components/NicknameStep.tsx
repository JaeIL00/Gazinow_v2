import { COLOR } from '@/global/constants';
import { FontText, Input, Space, TextButton } from '@/global/ui';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useCheckNickname, useSighUp } from '../apis/hooks';
import { debounce } from 'lodash';
import { SignUpParams } from '../type';
import { useAppDispatch } from '@/store';
import { saveUserInfo } from '@/store/modules';
import StepButton from '../ui/StepButton';
import { setEncryptedStorage } from '@/global/utils';
import IconCheck from '@assets/icons/check.svg';
import IconXCircle from '@assets/icons/x-circle-standard.svg';

interface NicknameStepProps {
  nicknameValue: string;
  signUpData: SignUpParams;
  changeNicknameValue: (value: string) => void;
  setStep: () => void;
}

const NicknameStep = ({
  nicknameValue,
  signUpData,
  changeNicknameValue,
  setStep,
}: NicknameStepProps) => {
  const dispatch = useAppDispatch();

  const [checkMessage, setCheckMessage] = useState<string>('');

  const { signUpMutate } = useSighUp({
    onSuccess: async ({ email, nickName, accessToken, refreshToken }) => {
      dispatch(saveUserInfo({ email, nickname: nickName }));
      await setEncryptedStorage('access_token', accessToken);
      await setEncryptedStorage('refresh_token', refreshToken);
      setStep();
    },
  });
  const { data, checkNicknameMutate } = useCheckNickname({
    onSettled: (data, error) => {
      if (!!data) setCheckMessage(data.message);
      else if (!!error) {
        if (error.response?.status === 409) setCheckMessage('중복된 닉네임입니다');
        if (error.response?.status === 400)
          setCheckMessage('영어(소문자,대문자), 한글, 숫자만 입력 가능합니다');
      }
    },
  });

  const changeNicknameHandler = (value: string) => {
    if (value.length > 7) return;
    changeNicknameValue(value);
    setCheckMessage('');
    checkNicknameDebounce(value);
  };

  const checkNicknameDebounce = useCallback(
    debounce((value: string) => {
      if (value.length < 2) return;
      checkNicknameMutate(value);
    }, 700),
    [],
  );

  return (
    <View style={{ flex: 1 }}>
      <View>
        <FontText
          value={`사용하실 닉네임을\n입력해주세요`}
          textSize="24px"
          textWeight="Bold"
          textColor={COLOR.BASIC_BLACK}
        />
        <Space height="10px" />
        <FontText
          value="다른 사용자들이 볼 수 있고, 내 프로필에서 수정할 수 있어요"
          textSize="13px"
          textWeight="Regular"
          textColor={COLOR.GRAY_999}
        />
      </View>

      <View style={{ flex: 1, marginTop: 40 }}>
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
            value={nicknameValue}
            placeholder="닉네임 입력"
            placeholderTextColor={COLOR.GRAY_BE}
            fontSize="14px"
            onChangeText={(text) => changeNicknameHandler(text)}
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 9 }}>
          {checkMessage && (
            <>
              {data?.state === 200 ? (
                <IconCheck width={14} height={14} color={COLOR.LIGHT_GREEN} />
              ) : (
                <IconXCircle width={14} height={14} />
              )}
              <Space width="3px" />
              <FontText
                value={checkMessage}
                textSize="12px"
                textWeight="Medium"
                textColor={data?.state === 200 ? COLOR.LIGHT_GREEN : COLOR.LIGHT_RED}
              />
            </>
          )}
          {!!nicknameValue && nicknameValue.length < 2 && (
            <>
              <IconXCircle width={14} height={14} />
              <Space width="3px" />
              <FontText
                value="2~7글자 입력해주세요"
                textSize="12px"
                textWeight="Medium"
                textColor={COLOR.LIGHT_RED}
              />
            </>
          )}
        </View>
      </View>

      <StepButton
        value="확인"
        backgroundCondition={checkMessage.includes('가능')}
        onPress={() => {
          signUpMutate({
            ...signUpData,
            nickName: signUpData.nickname,
          });
        }}
        disabled={!checkMessage.includes('가능')}
      />
    </View>
  );
};

export default NicknameStep;
