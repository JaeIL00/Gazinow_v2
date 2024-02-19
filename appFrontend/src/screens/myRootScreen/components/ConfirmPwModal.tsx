import styled from '@emotion/native';
import { useCallback, useState } from 'react';
import { Alert, Keyboard, Modal, Pressable, SafeAreaView } from 'react-native';
import { FontText, Input, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useCheckPasswordQuery, useDeleteAccountMutation } from '@/global/apis/hook';
import { useRootNavigation } from '@/navigation/RootNavigation';
import BackBtn from '@assets/icons/backBtn.svg';
import { removeEncryptedStorage } from '@/global/utils';
import { debounce } from 'lodash';

interface ModalProps {
  onCancel: () => void;
  isVisible: boolean;
}

const ConfirmPwModal = ({ onCancel, isVisible }: ModalProps) => {
  const navigation = useRootNavigation();
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [isPwRight, setIsPwRight] = useState<boolean>(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const keyboardDidShow = () => setKeyboardVisible(true);
  const keyboardDidHide = () => setKeyboardVisible(false);

  Keyboard.addListener('keyboardDidShow', keyboardDidShow);
  Keyboard.addListener('keyboardDidHide', keyboardDidHide);

  const { deleteAccountMutate } = useDeleteAccountMutation({
    onSuccess: () => {
      removeEncryptedStorage('access_token');
      removeEncryptedStorage('refresh_token');
      navigation.reset({ routes: [{ name: 'AuthStack' }] });
    },
    onError: (error: any) => {
      console.log(error);
      Alert.alert('회원 탈퇴 오류', '회원 탈퇴에 실패했습니다\n다시 시도해주세요');
    },
  });

  const checkPasswordDebounce = useCallback(
    debounce((curPassword: string) => {
      checkPasswordMutate(curPassword);
    }, 300),
    [],
  );

  const handleCurPasswordChange = (curPassword: string) => {
    setPasswordInput(curPassword);
    checkPasswordDebounce(curPassword);
  };

  const { checkPasswordMutate } = useCheckPasswordQuery({
    onSuccess: () => {
      setIsPwRight(true);
    },
    onError: (error: any) => {
      console.log(error);
      setIsPwRight(false);
    },
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal visible={isVisible} onRequestClose={onCancel}>
        <Header>
          <Pressable hitSlop={20} onPress={onCancel}>
            <BackBtn />
          </Pressable>
        </Header>
        <Container>
          <AlertContainer>
            <FontText
              value="비밀번호 입력"
              textSize="24px"
              textWeight="SemiBold"
              lineHeight="35px"
            />
            <Space height="20px" />
            <FontText
              value="탈퇴를 위해 비밀번호를 입력해주세요."
              textSize="16px"
              textWeight="Regular"
              lineHeight="21px"
            />
          </AlertContainer>
          <PwContainer>
            <FontText
              value="Password"
              textSize="14px"
              textWeight="Medium"
              lineHeight="21px"
              textColor="#7C8183 "
            />
            <InputBox>
              <Input
                placeholder="비밀번호를 입력해주세요"
                value={passwordInput}
                onChangeText={(text) => handleCurPasswordChange(text)}
                inputMode="text"
                placeholderTextColor={COLOR.GRAY_999}
                secureTextEntry
              />
            </InputBox>
          </PwContainer>
          <BottomBtn
            onPress={() => deleteAccountMutate()}
            disabled={!isPwRight}
            style={{
              bottom: isKeyboardVisible ? 20 : 83,
            }}
          >
            <TextButton
              value="탈퇴하기"
              textSize="17px"
              textWeight="Regular"
              lineHeight="26px"
              textColor={COLOR.WHITE}
              onPress={() => deleteAccountMutate()}
            />
          </BottomBtn>
        </Container>
      </Modal>
    </SafeAreaView>
  );
};
export default ConfirmPwModal;

const Header = styled.View`
  padding: 0 0 0 22px;
  height: 56px;
  flex-direction: row;
  align-items: center;
`;
const Container = styled.View`
  background-color: white;
  padding: 0 16px;
  flex: 1;
`;
const PwContainer = styled.View`
  flex: 1;
`;
const AlertContainer = styled.Pressable`
  margin: 43px 0 29px;
`;
const BottomBtn = styled.Pressable`
  padding-vertical: 11px;
  border-radius: 5px;
  align-items: center;
  ${({ disabled }) =>
    disabled ? `background-color : #dddddd` : `background-color : ${COLOR.BASIC_BLACK};`}
`;
const InputBox = styled.Pressable`
  padding: 12px 16px;
  margin-vertical: 7px;
  border-radius: 5px;
  background-color: ${COLOR.GRAY_F2};
`;
