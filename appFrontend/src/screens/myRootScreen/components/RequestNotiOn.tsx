import { Linking, TouchableOpacity, View } from 'react-native';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';

const RequestNotiOn = () => {
  const goToDeviceSettings = () => {
    Linking.openSettings();
  };

  return (
    <>
      <View className="flex-1 mx-16 mt-229 items-center">
        <FontText
          value="기기 알림을 켜주세요!"
          textSize="20px"
          textWeight="SemiBold"
          lineHeight={25}
        />
        <View className="h-7" />
        <FontText
          value="정보 알림을 받기 위해선 기기 알림을 켜주세요"
          textSize="13px"
          textWeight="Medium"
          lineHeight={19}
          textColor={COLOR.GRAY_999}
        />
      </View>

      <TouchableOpacity
        className="h-48 mb-41 mx-16 rounded-5 justify-center items-center bg-black-17"
        onPress={goToDeviceSettings}
      >
        <FontText
          value="기기 알림 켜기"
          textSize="17px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
        />
      </TouchableOpacity>
    </>
  );
};
export default RequestNotiOn;
