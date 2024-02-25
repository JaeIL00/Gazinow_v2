import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import { MyPageStackParamList } from '@/navigation/types/navigation';
import MyRootScreen from '@/screens/myRootScreen';
import ChangeNickNameModal from '@/screens/myRootScreen/components/ChangeNickNameModal';
import ChangePwModal from '@/screens/myRootScreen/components/ChangePwModal';
import ConfirmPwModal from '@/screens/myRootScreen/components/ConfirmPwModal';
import ConfirmQuitModal from '@/screens/myRootScreen/components/ConfirmQuitModal';
import ManageAccountModal from '@/screens/myRootScreen/components/ManageAccountModal';
import NotiOnModal from '@/screens/myRootScreen/components/NotiOnModal';
import NotiSettingsModal from '@/screens/myRootScreen/components/NotiSettingsModal';
import SubscribeTermsModal from '@/screens/myRootScreen/components/SubscribeTermsModal';
import PersonalTermsModal from '@/screens/myRootScreen/components/PersonalTermsModal';

const Stack = createStackNavigator<MyPageStackParamList>();

const screenOption = {
  headerShown: false,
};

const MyPageNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="MyRootScreen" screenOptions={screenOption}>
      <Stack.Screen name="MyRootScreen" component={MyRootScreen} />
      <Stack.Screen name="ChangeNickNameModal" component={ChangeNickNameModal} />
      <Stack.Screen name="ChangePwModal" component={ChangePwModal} />
      <Stack.Screen name="ConfirmPwModal" component={ConfirmPwModal} />
      <Stack.Screen name="ConfirmQuitModal" component={ConfirmQuitModal} />
      <Stack.Screen name="ManageAccountModal" component={ManageAccountModal} />
      <Stack.Screen name="NotiOnModal" component={NotiOnModal} />
      <Stack.Screen name="NotiSettingsModal" component={NotiSettingsModal} />
      <Stack.Screen name="SubscribeTermsModal" component={SubscribeTermsModal} />
      <Stack.Screen name="PersonalTermsModal" component={PersonalTermsModal} />
    </Stack.Navigator>
  );
};

export default MyPageNavigation;

export const useMyPageNavigation = <RouteName extends keyof MyPageStackParamList>() => {
  return useNavigation<StackNavigationProp<MyPageStackParamList, RouteName>>();
};
