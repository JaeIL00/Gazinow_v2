import { SafeAreaView, ScrollView } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';
import { Space } from '@/global/ui';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <Space height="16px" />
        <SwapStation />
        <SavedRouteIssues />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
