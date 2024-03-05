import { SafeAreaView, ScrollView } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';
import { Space } from '@/global/ui';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useTryAuthorization } from './hooks';

const HomeScreen = () => {
  const { authState, tryAuthorization } = useTryAuthorization();

  useEffect(() => {
    if (authState === 'yet') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [authState]);

  useEffect(() => {
    // tryAuthorization();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={authState === 'success auth'}
      >
        <Space height="16px" />
        <SwapStation />
        <SavedRouteIssues authState={authState} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
