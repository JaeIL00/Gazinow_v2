import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useState } from 'react';
import { FontText, Space, TextButton } from '@/global/ui';
import { COLOR, SIGNIN } from '@/global/constants';
import MyTabModal from '../../global/components/MyTabModal';
import { useCheckPasswordQuery, useDeleteAccountMutation } from '@/global/apis/hook';

const ConfirmQuitScreen = () => {
  const nickName = '사용자17349245';
  const navigation = useRootNavigation();
  const [popupVisible, setPopupVisible] = useState(false);
  const [confirmPwPopupVisible, setConfirmPwPopupVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const { deleteAccountMutate } = useDeleteAccountMutation({
    onSuccess: () => navigation.reset({ routes: [{ name: SIGNIN }] }),
  });

  const { checkPasswordMutate } = useCheckPasswordQuery({
    onSuccess: () => {
      deleteAccountMutate();
      hideModal();
    },
    onError: (error) => {
      if (error.response.status === 400) {
        setPasswordInput('');
        //TODO: 기획 나오면 에러 처리 추가, css 수정
      }
    },
  });

  const handleConfirm = () => {
    hideModal();
    setConfirmPwPopupVisible(true);
  };
  const handleConfirmPw = () => {
    checkPasswordMutate(passwordInput);
  };

  const showQuitPopup = () => setPopupVisible(true);
  const hideModal = () => {
    setPopupVisible(false);
    setConfirmPwPopupVisible(false);
  };

  return (
    <Container>
      <AlertContainer>
        <FontText
          value={`${nickName}님,\n정말 탈퇴하시겠어요?`}
          textSize="24px"
          textWeight="Bold"
          lineHeight="32px"
        />
        <Space height="20px" />
        <FontText
          value={`탈퇴 시 계정의 모든 정보는 삭제되고\n재가입 시에도 복구하기 어려워요.`}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
        />
      </AlertContainer>
      <BottomBtn onPress={() => navigation.goBack()}>
        <TextButton
          value="이전으로 돌아가기"
          textSize="17px"
          textWeight="Regular"
          lineHeight="26px"
          textColor={COLOR.WHITE}
          onPress={() => navigation.goBack()}
        />
      </BottomBtn>
      <QuitBtn>
        <UnderLine>
          <TextButton
            value="탈퇴하기"
            textSize="13px"
            textWeight="Regular"
            lineHeight="18px"
            textColor={COLOR.GRAY_999}
            onPress={() => showQuitPopup()}
          />
        </UnderLine>
      </QuitBtn>
      <MyTabModal
        isVisible={popupVisible}
        onCancel={hideModal}
        onConfirm={handleConfirm}
        title="정말 탈퇴할까요?"
        confirmText="탈퇴할래요"
        cancelText="아니요"
      />
      {/* TODO: 키보드 올라오면 하단 버튼 올라오는 버그 수정 */}
      <MyTabModal
        isVisible={confirmPwPopupVisible}
        onCancel={hideModal}
        onConfirm={handleConfirmPw}
        title="비밀번호 확인"
        confirmText="탈퇴할래요"
        cancelText="취소"
        inputValue={passwordInput}
        setInputValue={setPasswordInput}
      />
    </Container>
  );
};
export default ConfirmQuitScreen;

const Container = styled.View`
  background-color: white;
  padding: 0 16px;
  flex: 1;
`;
const AlertContainer = styled.Pressable`
  flex: 1;
  margin-top: 29px;
`;
const BottomBtn = styled.Pressable`
  padding-vertical: 11px;
  margin-bottom: 24px;
  border-radius: 5px;
  align-items: center;
  background-color: ${COLOR.BASIC_BLACK};
`;
const QuitBtn = styled.Pressable`
  align-items: center;
  margin-bottom: 79px;
`;
const UnderLine = styled.Pressable`
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY_999};
`;
