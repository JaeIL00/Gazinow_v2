import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { SUBWAY_SEARCH, SUBWAY_PATH_RESULT } from '@/constants';
import { SearchPathResultPage, SubwaySearchPage } from '@/pages/search';
import { SearchStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<SearchStackParamList>();

const screenOption = {
  headerShown: false,
};

const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name={SUBWAY_SEARCH} component={SubwaySearchPage} />
      <Stack.Screen name={SUBWAY_PATH_RESULT} component={SearchPathResultPage} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;

export const useSearchNavigation = <RouteName extends keyof SearchStackParamList>() => {
  return useNavigation<StackNavigationProp<SearchStackParamList, RouteName>>();
};
