import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';
import Toast from 'react-native-toast-message';

import { IssueStackParamList } from '@/navigation/types/navigation';

import SearchStationScreen from '@/screens/searchStationScreen';
import IssueDetailScreen from '@/screens/issueDetailScreen';
import toastConfig from '@global/utils/ToastConfig';

const Stack = createStackNavigator<IssueStackParamList>();

const screenOption = {
  headerShown: false,
};

const IssueNavigation = () => {
  return (
    <>
      <Stack.Navigator screenOptions={screenOption}>
        <Stack.Screen name="SearchStation" component={SearchStationScreen} />
        <Stack.Screen name="IssueDetail" component={IssueDetailScreen} />
      </Stack.Navigator>
      <Toast config={toastConfig} />
    </>
  );
};

export default IssueNavigation;

export const useIssueNavigation = <RouteName extends keyof IssueStackParamList>() => {
  return useNavigation<StackNavigationProp<IssueStackParamList, RouteName>>();
};
