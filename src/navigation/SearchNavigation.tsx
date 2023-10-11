import { createStackNavigator } from '@react-navigation/stack';

import { SubwaySearchPage } from '@/components/search/page';
import { SUBWAY_SEARCH } from '@/constants';

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
