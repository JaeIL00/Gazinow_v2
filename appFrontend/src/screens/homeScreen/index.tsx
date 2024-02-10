import { SafeAreaView, ScrollView, Text } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: 16,
        }}
      >
        <Text>홈 페이지</Text>
        <SwapStation />
        <SavedRouteIssues />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
