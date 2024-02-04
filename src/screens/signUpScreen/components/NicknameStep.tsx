import { COLOR } from '@/global/constants';
import { FontText, Input, Space, TextButton } from '@/global/ui';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import CloseIcon from 'react-native-vector-icons/Ionicons';
import { useCheckNickname, useSighUp } from '../apis/hooks';
import { debounce } from 'lodash';
import CheckIcon from 'react-native-vector-icons/Feather';
import { SignUpParams } from '../type';
import { useAppDispatch } from '@/store';
import { saveUserInfo } from '@/store/modules';

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
    onSuccess: ({ email, nickName }) => {
      dispatch(saveUserInfo({ email, nickname: nickName }));
      setStep();
    },
  });
  const { data, checkNicknameMutate } = useCheckNickname({
    onSettled: (data, error) => {
      if (!!data) setCheckMessage(data.message);
      else if (!!error && error.message.includes('409')) setCheckMessage('중복된 닉네임입니다');
    },
  });

  const changeNicknameHandler = (value: string) => {
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
            autoFocus
          />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 9 }}>
          {checkMessage && (
            <>
              {data?.state === 200 ? (
                <CheckIcon name="check" size={14} color={COLOR.LIGHT_GREEN} />
              ) : (
                <CloseIcon name="close-circle-outline" size={14} color={COLOR.LIGHT_RED} />
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
              <CloseIcon name="close-circle-outline" size={14} color={COLOR.LIGHT_RED} />
              <Space width="3px" />
              <FontText
                value="2글자 이상 입력해주세요"
                textSize="12px"
                textWeight="Medium"
                textColor={COLOR.LIGHT_RED}
              />
            </>
          )}
        </View>
      </View>

      <TextButton
        value="회원가입"
        textSize="17px"
        textWeight="SemiBold"
        textColor={COLOR.WHITE}
        style={{
          backgroundColor: checkMessage.includes('가능') ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          height: 48,
          marginBottom: 24,
        }}
        onPress={() =>
          signUpMutate({
            ...signUpData,
            nickName: signUpData.nickname,
          })
        }
        disabled={!checkMessage.includes('가능')}
      />
    </View>
  );
};

export default NicknameStep;
