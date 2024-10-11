import { Linking, TouchableOpacity, View } from 'react-native';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';

const RequestNotiOn = () => {
  const goToDeviceSettings = () => {
    Linking.openSettings();
  };

  return (
    <>
      <View className="items-center flex-1 mx-16 mt-229">
        <FontText text="기기 알림을 켜주세요!" className="text-20 leading-25" fontWeight="600" />
        <View className="h-7" />
        <FontText
          text="정보 알림을 받기 위해선 기기 알림을 켜주세요"
          className="text-13 text-gray-999 leading-19"
          fontWeight="500"
        />
      </View>

      <TouchableOpacity
        className="items-center justify-center h-48 mx-16 mb-41 rounded-5 bg-black-17"
        onPress={goToDeviceSettings}
      >
        <FontText text="기기 알림 켜기" className="text-white text-17" fontWeight="600" />
      </TouchableOpacity>
    </>
  );
};
export default RequestNotiOn;
