import { SafeAreaView, ScrollView } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';
import { Space } from '@/global/ui';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);
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
