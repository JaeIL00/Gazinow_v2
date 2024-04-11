import { SafeAreaView, ScrollView } from 'react-native';
import { SavedRouteIssues, SwapStation } from './components';
import { COLOR } from '@/global/constants';
import { Space } from '@/global/ui';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useTryAuthorization } from './hooks';
import IssueCarrousel from './components/IssueCarrousel';

const HomeScreen = () => {
  const { isVerifiedUser, tryAuthorization } = useTryAuthorization();

  useEffect(() => {
    if (isVerifiedUser !== 'yet') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }
  }, [isVerifiedUser]);

  useEffect(() => {
    if (isVerifiedUser === 'yet') tryAuthorization();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isVerifiedUser === 'success auth'}
      >
        <Space height="16px" />
        <IssueCarrousel />
        <Space height="16px" />
        <SwapStation />
        <SavedRouteIssues isVerifiedUser={isVerifiedUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
