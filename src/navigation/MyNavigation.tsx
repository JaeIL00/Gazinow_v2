import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import styled from '@emotion/native';
import { IconButton } from '@/global/ui';
import { EditRouteStackParamList, MyStackParamList } from './types/navigation';
import MyRootScreen from '@/screens/myRootScreen';
import {
  MY_ROOT,
  ACCOUNT_MANAGE,
  CONFIRM_QUIT,
  NOTIFICATION_SETTINGS,
  NOTIFICATION,
} from '@/global/constants';
import AccountManageScreen from '@/screens/accountManageScreen';
import NotificationSettingsScreen from '@/screens/notificationSettingsScreen';
import ConfirmQuitScreen from '@/screens/confirmQuitScreen';
import NotificationOnScreen from '@/screens/notificationOnScreen';

const Stack = createStackNavigator<MyStackParamList>();

const renderHeaderLeft = (
  navigation: StackNavigationProp<EditRouteStackParamList, keyof EditRouteStackParamList>,
) => ({
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="backBtn"
        iconWidth="24px"
        iconHeight="24px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
});

const MyNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={MY_ROOT} component={MyRootScreen} />
      <Stack.Screen
        name={ACCOUNT_MANAGE}
        component={AccountManageScreen}
        options={({ navigation }) => ({
          title: '계정 관리',
          ...renderHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={NOTIFICATION_SETTINGS}
        component={NotificationSettingsScreen}
        options={({ navigation }) => ({
          title: '알림 설정',
          ...renderHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={NOTIFICATION}
        component={NotificationOnScreen}
        options={({ navigation }) => ({
          title: '알림 설정',
          ...renderHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={CONFIRM_QUIT}
        component={ConfirmQuitScreen}
        options={({ navigation }) => ({
          title: '',
          ...renderHeaderLeft(navigation),
        })}
      />
    </Stack.Navigator>
  );
};

export default MyNavigation;

export const useMyNavigation = <RouteName extends keyof MyStackParamList>() => {
  return useNavigation<StackNavigationProp<MyStackParamList, RouteName>>();
};
const HeaderLeft = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;
