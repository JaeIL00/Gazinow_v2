import { useState } from 'react';
import { FontText, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import MyTabModal from '@/global/components/MyTabModal';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';

const ConfirmQuitScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  const { nickname } = useSelector((state: RootState) => state.auth);
  const [popupVisible, setPopupVisible] = useState(false);

  const handleConfirm = () => {
    setPopupVisible(false);
    myPageNavigation.navigate('ConfirmPwScreen');
  };

  return (
    <SafeAreaView className="flex-1 px-16 bg-white">
      <TouchableOpacity
        className="pl-4 h-56 items-center flex-row"
        onPress={() => myPageNavigation.goBack()}
      >
        <IconLeftArrowHead color="#3F3F46" />
      </TouchableOpacity>

      <View className="flex-1 pt-29 gap-20">
        <FontText
          value={`${nickname}님,\n정말 탈퇴하시겠어요?`}
          textSize="24px"
          textWeight="Bold"
          lineHeight="32px"
        />
        <FontText
          value={`탈퇴 시 계정의 모든 정보는 삭제되고\n재가입 시에도 복구하기 어려워요.`}
          textSize="16px"
          textWeight="Regular"
          lineHeight="21px"
        />
      </View>

      <TouchableOpacity
        className="py-11 mb-24 rounded-5 items-center bg-black-17"
        onPress={() => myPageNavigation.goBack()}
      >
        <FontText
          value="이전으로 돌아가기"
          textSize="17px"
          textWeight="Regular"
          lineHeight="26px"
          textColor={COLOR.WHITE}
        />
      </TouchableOpacity>

      <TouchableOpacity className="mb-79 items-center" onPress={() => setPopupVisible(true)}>
        <FontText
          className="border-b-1 border-gray-99"
          value="탈퇴하기"
          textSize="13px"
          textWeight="Regular"
          lineHeight="18px"
          textColor={COLOR.GRAY_999}
        />
      </TouchableOpacity>

      <MyTabModal
        isVisible={popupVisible}
        onCancel={() => setPopupVisible(false)}
        onConfirm={handleConfirm}
        title="정말 탈퇴할까요?"
        confirmText="탈퇴할래요"
        cancelText="아니요"
      />
    </SafeAreaView>
  );
};

export default ConfirmQuitScreen;
