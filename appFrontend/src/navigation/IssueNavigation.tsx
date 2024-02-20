import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { SUBWAY_PATH_RESULT } from '@/global/constants';
import { HOME, SUBWAY_PATH_DETAIL } from '@/global/constants/navigation';
import { HomeStackParamList, IssueStackParamList } from '@/navigation/types/navigation';
import SearchPathResultScreen from '@/screens/searchPathResultScreen';
import SearchPathResultDetailScreen from '@/screens/searchPathResultDetailScreen';
import HomeScreen from '@/screens/homeScreen';
import SavedRoutesScreen from '@/screens/savedRoutesScreen';
import styled from '@emotion/native';
import SearchStationScreen from '@/screens/searchStationScreen';

const Stack = createStackNavigator<IssueStackParamList>();

const screenOption = {
  headerShown: false,
};

const IssueNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name="SearchStation" component={SearchStationScreen} />
      <Stack.Screen name="IssueDetail" component={SearchPathResultScreen} />
    </Stack.Navigator>
  );
};

export default IssueNavigation;

export const useIssueNavigation = <RouteName extends keyof IssueStackParamList>() => {
  return useNavigation<StackNavigationProp<IssueStackParamList, RouteName>>();
};
