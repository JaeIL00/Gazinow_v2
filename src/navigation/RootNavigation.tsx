import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { EDIT_ROUTE_NAVIGATION, SIGNIN, MAIN_BOTTOM_TAB, MY_NAVIGATION } from '@/global/constants';
import { EditRouteNavigation, MainBottomTabNavigation } from '@/navigation';
import type { RootStackParamList } from '@/navigation/types/navigation';
import { useMutation } from 'react-query';
import { useEffect } from 'react';
import { getEncryptedStorage, removeEncryptedStorage, setEncryptedStorage } from '@/global/utils';
import { View } from 'react-native';
import { FontText } from '@/global/ui';
import { tokenReissueFetch } from '@/global/apis/func';
import MyNavigation from './MyNavigation';
import SignInScreen from '@/screens/signInScreen';

const Stack = createStackNavigator<RootStackParamList>();

const screenOption = {
  headerShown: false,
};

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name={'Temp'}
        component={() => {
          const rootNavigation = useRootNavigation();

          const { mutate } = useMutation(tokenReissueFetch, {
            onSuccess: async ({ newAccessToken, newRefreshToken }) => {
              await setEncryptedStorage('access_token', newAccessToken);
              await setEncryptedStorage('refresh_token', newRefreshToken);
              rootNavigation.replace(MAIN_BOTTOM_TAB, { screen: 'homeStack' });
            },
            onError: () => {
              removeEncryptedStorage('access_token');
              removeEncryptedStorage('refresh_token');
              rootNavigation.replace(SIGNIN);
            },
          });

          const firstAuthorization = async () => {
            const accessToken = await getEncryptedStorage('access_token');
            const refreshToken = await getEncryptedStorage('refresh_token');
            if (!accessToken) {
              rootNavigation.navigate(SIGNIN);
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
      <Stack.Screen name={SIGNIN} component={SignInScreen} />
      <Stack.Screen name={MAIN_BOTTOM_TAB} component={MainBottomTabNavigation} />
      <Stack.Screen name={EDIT_ROUTE_NAVIGATION} component={EditRouteNavigation} />
      <Stack.Screen name={MY_NAVIGATION} component={MyNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, RouteName>>();
};
