import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import { View } from 'react-native';

const NoRoutes = () => (
  <View className="border-t-1 border-gray-eb">
    <FontText
      value="저장한 경로가 없어요"
      textSize="13px"
      textWeight="Regular"
      lineHeight="400px"
      textColor={COLOR.GRAY_999}
      textAlign="center"
    />
  </View>
);

export default NoRoutes;
