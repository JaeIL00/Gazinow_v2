import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import { View } from 'react-native';

const NoRoutes = () => (
  <View className="border-t-1 border-gray-beb">
    <FontText text="저장한 경로가 없어요" className="text-center text-13 text-gray-999" />
  </View>
);

export default NoRoutes;
