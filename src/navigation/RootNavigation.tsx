import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { MainBottomTabNavigation } from '@/navigation';
import { MAIN_BOTTOM_TAB } from '@/global/constants';
import type { RootStackParamList } from '@/navigation/types/navigation';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { getEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { View } from 'react-native';
import { FontText } from '@/global/ui';
import { tokenReissueFetch } from '@/global/apis/func';
import MyNavigation from './MyNavigation';
import AuthNavigation from './AuthNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const screenOption = {
  headerShown: false,
};

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption} initialRouteName="Temp">
      <Stack.Screen
        name={'Temp'}
        component={() => {
          const rootNavigation = useRootNavigation();

          const { mutate } = useMutation(tokenReissueFetch, {
            onSuccess: async ({ newAccessToken, newRefreshToken }) => {
              await setEncryptedStorage('access_token', newAccessToken);
              await setEncryptedStorage('refresh_token', newRefreshToken);
              rootNavigation.reset({ routes: [{ name: 'AuthStack' }] });
            },
            onError: () => {
              removeEncryptedStorage('access_token');
              removeEncryptedStorage('refresh_token');
              rootNavigation.reset({ routes: [{ name: 'AuthStack' }] });
            },
          });

          const firstAuthorization = async () => {
            const accessToken = await getEncryptedStorage('access_token');
            const refreshToken = await getEncryptedStorage('refresh_token');
            if (!accessToken) {
              rootNavigation.replace('AuthStack', { screen: 'Landing' });
              return;
            } else {
              mutate({
                accessToken,
                refreshToken,
              });
            }
          };

          useEffect(() => {
            // 나중에 스플래쉬 스크린으로 로직 이동
            firstAuthorization();
          }, []);
          return (
            <View>
              <FontText value="자동 로그인 중" textSize="16px" textWeight="Bold" />
            </View>
          );
        }}
      />
      <Stack.Screen name="AuthStack" component={AuthNavigation} />
      <Stack.Screen name={MAIN_BOTTOM_TAB} component={MainBottomTabNavigation} />
      <Stack.Screen name="MyStack" component={MyNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, RouteName>>();
};
