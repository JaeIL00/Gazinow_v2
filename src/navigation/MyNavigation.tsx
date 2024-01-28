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
  CHANGE_NICKNAME,
  CHANGE_PW,
  CONFIRM_QUIT,
  CONTRACT,
  NOTIFICATION_SETTINGS,
  NOTIFICATION,
} from '@/global/constants';
import ChangeNickNameScreen from '@/screens/changeNickNameScreen';
import AccountManageScreen from '@/screens/accountManageScreen';
import NotificationSettingsScreen from '@/screens/notificationSettingsScreen';
import ChangePwScreen from '@/screens/changePwScreen';
import ConfirmQuitScreen from '@/screens/confirmQuitScreen';
import ContractScreen from '@/screens/contractScreen';
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
        iconWidth="27px"
        iconHeight="20px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
});

const renderHeaderNickname = (
  navigation: StackNavigationProp<EditRouteStackParamList, keyof EditRouteStackParamList>,
) => ({
  title: '닉네임 수정',
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="x"
        iconWidth="23px"
        iconHeight="23px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
});

const renderHeaderChangePw = (
  navigation: StackNavigationProp<EditRouteStackParamList, keyof EditRouteStackParamList>,
) => ({
  title: '비밀번호 변경',
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="backBtn"
        iconWidth="27px"
        iconHeight="20px"
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
        name={CHANGE_NICKNAME}
        component={ChangeNickNameScreen}
        options={({ navigation }) => renderHeaderNickname(navigation)}
      />
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
        name={CHANGE_PW}
        component={ChangePwScreen}
        options={({ navigation }) => renderHeaderChangePw(navigation)}
      />
      <Stack.Screen
        name={CONFIRM_QUIT}
        component={ConfirmQuitScreen}
        options={({ navigation }) => ({
          title: '',
          ...renderHeaderLeft(navigation),
        })}
      />
      <Stack.Screen
        name={CONTRACT}
        component={ContractScreen}
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
