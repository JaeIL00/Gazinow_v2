import { createStackNavigator } from '@react-navigation/stack';
import type { StackScreenProps } from '@react-navigation/stack';

import { SUBWAY_SEARCH } from '@/constants';
import { SubwaySearchPage } from '@/pages/search';
import { RootStackParamList, SearchStackParamList } from '@/types/navigation';

type NavigationProps = StackScreenProps<RootStackParamList, 'SearchNavigation'>;

const Stack = createStackNavigator<SearchStackParamList>();

const screenOption = {
  headerShown: false,
};

const SearchNavigation = ({ route }: NavigationProps) => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name={SUBWAY_SEARCH}
        component={SubwaySearchPage}
        initialParams={{ where: route.params.where }}
      />
    </Stack.Navigator>
  );
};

export default SearchNavigation;
