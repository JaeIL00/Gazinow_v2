import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { EditRouteStackParamList } from '@/types/navigation';
import { SavedRoutesPage, AddNewRoutePage } from '@/pages/savedRoutes';
import { COLOR, SAVED_ROUTES_PAGE, ADD_NEW_ROUTE_PAGE, SUBWAY_SEARCH, SUBWAY_PATH_RESULT } from '@/constants';
import { SearchPathResultDetail, SearchPathResultPage, SubwaySearchPage } from '@/pages/search';
import { SUBWAY_PATH_DETAIL } from '@/constants/navigation';

const Stack = createStackNavigator<EditRouteStackParamList>();

const screenOption = {
  headerShown: true,
  headerStyle: { backgroundColor: COLOR.LIGHT_GRAY, },
  headerTintColor: COLOR.BASIC_BLACK,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20, },
  title: '새 경로 저장',
};

const EditRouteNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen name={SAVED_ROUTES_PAGE} component={SavedRoutesPage} options={{ title: '저장경로 편집' }} />
      <Stack.Screen name={ADD_NEW_ROUTE_PAGE} component={AddNewRoutePage} />
      <Stack.Screen name={SUBWAY_SEARCH} component={SubwaySearchPage} />
      <Stack.Screen name={SUBWAY_PATH_RESULT} component={SearchPathResultPage} />
      <Stack.Screen name={SUBWAY_PATH_DETAIL} component={SearchPathResultDetail} />
    </Stack.Navigator>
  );
};

export default EditRouteNavigation;

export const useEditRouteNavigation = <RouteName extends keyof EditRouteStackParamList>() => {
  return useNavigation<StackNavigationProp<EditRouteStackParamList, RouteName>>();
};
