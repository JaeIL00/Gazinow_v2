import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16, backgroundColor: COLOR.GRAY_F9 }}
        showsVerticalScrollIndicator={false}
      >
        <Text>홈 페이지</Text>
        <SwapStation />
        <SavedRouteIssues />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
