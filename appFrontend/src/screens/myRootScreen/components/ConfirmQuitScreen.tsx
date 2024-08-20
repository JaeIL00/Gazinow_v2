import { useState } from 'react';
import { FontText } from '@/global/ui';
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
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-16">
        <TouchableOpacity
          className="flex-row items-center h-56"
          onPress={() => myPageNavigation.goBack()}
        >
          <IconLeftArrowHead width={24} color="#3F3F46" />
        </TouchableOpacity>

        <View className="flex-1 space-20 pt-29">
          <FontText
            value={`${nickname}님,\n정말 탈퇴하시겠어요?`}
            textSize="24px"
            textWeight="Bold"
            lineHeight={32}
          />
          <View className="h-20" />
          <FontText
            value={`탈퇴 시 계정의 모든 정보는 삭제되고\n재가입 시에도 복구하기 어려워요.`}
            textSize="16px"
            textWeight="Regular"
            lineHeight={21}
          />
        </View>

        <TouchableOpacity
          className="items-center mb-24 py-11 rounded-5 bg-black-17"
          onPress={() => myPageNavigation.goBack()}
        >
          <FontText
            value="이전으로 돌아가기"
            textSize="17px"
            textWeight="Regular"
            lineHeight={26}
            textColor={COLOR.WHITE}
          />
        </TouchableOpacity>

        <TouchableOpacity className="items-center mb-36" onPress={() => setPopupVisible(true)}>
          <View className="border-b-1 border-gray-99">
            <FontText
              value="탈퇴하기"
              textSize="13px"
              textWeight="Regular"
              textColor={COLOR.GRAY_999}
            />
          </View>
        </TouchableOpacity>

        <MyTabModal
          isVisible={popupVisible}
          onCancel={() => setPopupVisible(false)}
          onConfirm={handleConfirm}
          title="정말 탈퇴할까요?"
          confirmText="탈퇴할래요"
          cancelText="아니요"
        />
      </View>
    </SafeAreaView>
  );
};

export default ConfirmQuitScreen;
