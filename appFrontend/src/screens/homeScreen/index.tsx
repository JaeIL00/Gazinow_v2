import { RefreshControl, SafeAreaView, ScrollView, View } from 'react-native';
import { IssueCarrousel, SwapStation, MyRoutes } from './components';
import { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useTryAuthorization } from './hooks';
import IconBell from '@assets/icons/bell.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Path } from '@/global/apis/entity';

const HomeScreen = () => {
  const { isVerifiedUser, tryAuthorization } = useTryAuthorization();
  const rootNavigation = useRootNavigation();
  const homeNavigation = useHomeNavigation();

  useEffect(() => {
    if (isVerifiedUser !== 'yet') {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    }

    if (isVerifiedUser === 'success auth') {
      // 앱 종료 상태에서 푸시알림 클릭했을 때 저장한 상세 정보를 불러온 후 경로 상세 페이지 화면으로 이동
      const navigatePushNotiClick = async () => {
        const pushNotiParams = await AsyncStorage.getItem('pushNotiParams');

        if (pushNotiParams) {
          const parseJsonString = (pathJsonString: string) => {
            try {
              return JSON.parse(pathJsonString) as Path;
            } catch (error) {
              console.error('JSON 파싱 오류:', error);
            }
          };

          const parsedPathObject = parseJsonString(pushNotiParams);

          await rootNavigation.navigate('SubwayPathDetail', { state: parsedPathObject });

          await AsyncStorage.removeItem('pushNotiParams');
        }
      };

      navigatePushNotiClick();
    }
  }, [isVerifiedUser]);

  useEffect(() => {
    if (isVerifiedUser === 'yet') tryAuthorization();
  }, []);

  const authStateHandler = () =>
    isVerifiedUser === 'success auth'
      ? homeNavigation.push('NotiHistory')
      : rootNavigation.navigate('AuthStack', { screen: 'Landing' });

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  return (
    <SafeAreaView className="flex-1 bg-gray-9f9">
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        scrollEnabled={isVerifiedUser === 'success auth'}
        refreshControl={
          <RefreshControl
            onRefresh={() => setIsRefreshing(true)}
            refreshing={isRefreshing}
            progressViewOffset={-10}
          />
        }
      >
        <View className="flex-row mt-15">
          <View className="flex-1" />
          <TouchableOpacity onPress={authStateHandler} hitSlop={20}>
            <IconBell />
          </TouchableOpacity>
        </View>
        <IssueCarrousel isRefreshing={isRefreshing} setIsRefreshing={setIsRefreshing} />
        <View className="h-16" />
        <SwapStation />
        <MyRoutes
          isVerifiedUser={isVerifiedUser}
          isRefreshing={isRefreshing}
          setIsRefreshing={setIsRefreshing}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
