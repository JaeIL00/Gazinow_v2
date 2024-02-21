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
import AuthNavigation from './AuthNavigation';
import { useAppDispatch } from '@/store';
import { saveUserInfo } from '@/store/modules';
import IssueNavigation from './IssueNavigation';

const Stack = createStackNavigator<RootStackParamList>();

const screenOption = {
  headerShown: false,
};

const RootNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption} initialRouteName="Temp">
      <Stack.Screen
        name="Temp"
        component={() => {
          const rootNavigation = useRootNavigation();
          const dispatch = useAppDispatch();
          const { mutate } = useMutation(tokenReissueFetch, {
            onSuccess: async (data) => {
              dispatch(saveUserInfo({ nickname: data.nickName, email: data.email }));
              await setEncryptedStorage('access_token', data.accessToken);
              await setEncryptedStorage('refresh_token', data.refreshToken);
              rootNavigation.reset({ routes: [{ name: 'MainBottomTab' }] });
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
              rootNavigation.reset({ routes: [{ name: 'AuthStack' }] });
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
      <Stack.Screen name="IssueStack" component={IssueNavigation} />
      <Stack.Screen name={MAIN_BOTTOM_TAB} component={MainBottomTabNavigation} />
    </Stack.Navigator>
  );
};

export default RootNavigation;

export const useRootNavigation = <RouteName extends keyof RootStackParamList>() => {
  return useNavigation<StackNavigationProp<RootStackParamList, RouteName>>();
};
