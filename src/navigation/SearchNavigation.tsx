import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { SUBWAY_SEARCH, SUBWAY_PATH_RESULT } from '@/global/constants';
import { SUBWAY_PATH_DETAIL } from '@/global/constants/navigation';
import { SearchStackParamList } from '@/global/types/navigation';
import SubwaySearchScreen from '@/screens/subwaySearchScreen';
import SearchPathResultScreen from '@/screens/searchPathResultScreen';
import SearchPathResultDetailScreen from '@/screens/searchPathResultDetailScreen';

const Stack = createStackNavigator<SearchStackParamList>();

const screenOption = {
  headerShown: false,
};

const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name={SUBWAY_SEARCH} component={SubwaySearchScreen} />
      <Stack.Screen name={SUBWAY_PATH_RESULT} component={SearchPathResultScreen} />
      <Stack.Screen name={SUBWAY_PATH_DETAIL} component={SearchPathResultDetailScreen} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;

export const useSearchNavigation = <RouteName extends keyof SearchStackParamList>() => {
  return useNavigation<StackNavigationProp<SearchStackParamList, RouteName>>();
};
