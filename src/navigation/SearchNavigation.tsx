import { createStackNavigator } from '@react-navigation/stack';

import { SUBWAY_SEARCH } from '@/constants';
import { SubwaySearchPage } from '@/pages/search';

const Stack = createStackNavigator();

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
