import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationProp } from '@react-navigation/stack';

import { EditRouteStackParamList } from '@/navigation/types/navigation';
import {
  COLOR,
  SAVED_ROUTES_PAGE,
  ADD_NEW_ROUTE_PAGE,
  SUBWAY_SEARCH,
  SUBWAY_PATH_RESULT,
} from '@/global/constants';
import { NAME_NEW_ROUTE_PAGE, SUBWAY_PATH_DETAIL } from '@/global/constants/navigation';
import AddNewRouteScreen from '@/screens/addNewRouteScreen';
import NameNewRouteScreen from '@/screens/nameNewRouteScreen';
import SavedRoutesScreen from '@/screens/savedRoutesScreen';
import SelectNewRouteScreen from '@/screens/selectNewRouteScreen';

const Stack = createStackNavigator<EditRouteStackParamList>();

const screenOption = {
  headerShown: true,

  headerTintColor: COLOR.BASIC_BLACK,
  headerTitleStyle: { fontWeight: 'bold', fontSize: 20 },
  title: '새 경로 저장',
};

const EditRouteNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name={SAVED_ROUTES_PAGE}
        component={SavedRoutesScreen}
        options={{ headerStyle: { backgroundColor: COLOR.LIGHT_GRAY }, title: '저장경로 편집' }}
      />
      <Stack.Screen name={ADD_NEW_ROUTE_PAGE} component={AddNewRouteScreen} />
      {/* <Stack.Screen name={SUBWAY_SEARCH} component={SubwaySearchPage} /> */}
      <Stack.Screen name={SUBWAY_PATH_RESULT} component={SelectNewRouteScreen} />
      {/* <Stack.Screen name={SUBWAY_PATH_DETAIL} component={SearchPathResultDetail} /> */}
      <Stack.Screen name={NAME_NEW_ROUTE_PAGE} component={NameNewRouteScreen} />
    </Stack.Navigator>
  );
};

export default EditRouteNavigation;

export const useEditRouteNavigation = <RouteName extends keyof EditRouteStackParamList>() => {
  return useNavigation<StackNavigationProp<EditRouteStackParamList, RouteName>>();
};
