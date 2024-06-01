import { SafeAreaView, ScrollView, View } from 'react-native';
import { IssueCarrousel, SwapStation, MyRoutes } from './components';
import { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useTryAuthorization } from './hooks';

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
    <SafeAreaView className="flex-1 bg-gray-f9">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isVerifiedUser === 'success auth'}
      >
        <IssueCarrousel />
        <View className="h-16" />
        <SwapStation />
        <MyRoutes isVerifiedUser={isVerifiedUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
