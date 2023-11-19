import { createStackNavigator } from '@react-navigation/stack';

import { SUBWAY_SEARCH } from '@/constants';
import { SubwaySearchPage } from '@/pages/search';
import { SearchStackParamList } from '@/types/navigation';

const Stack = createStackNavigator<SearchStackParamList>();

const screenOption = {
  headerShown: false,
};

const SearchNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name={SUBWAY_SEARCH} component={SubwaySearchPage} />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
