import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';
import { EditRouteStackParamList } from '@/navigation/types/navigation';
import {
  COLOR,
  SAVED_ROUTES,
  ADD_NEW_ROUTE,
  SUBWAY_SEARCH,
  SUBWAY_PATH_RESULT,
} from '@/global/constants';
import { NAME_NEW_ROUTE, SUBWAY_PATH_DETAIL } from '@/global/constants/navigation';
import AddNewRouteScreen from '@/screens/addNewRouteScreen';
import NameNewRouteScreen from '@/screens/nameNewRouteScreen';
import SavedRoutesScreen from '@/screens/savedRoutesScreen';
import SelectNewRouteScreen from '@/screens/selectNewRouteScreen';
import styled from '@emotion/native';
import { IconButton } from '@/global/ui';
import NewRouteSearchScreen from '@/screens/newRouteSearchScreen';
import NewRoutePathDetailScreen from '@/screens/newRoutePathDetailScreen';

const Stack = createStackNavigator<EditRouteStackParamList>();

const screenOption: StackNavigationOptions = {
  headerShown: true,
  headerTintColor: COLOR.BASIC_BLACK,
  headerTitleStyle: { fontWeight: '600', fontSize: 20 },
  title: '새 경로 저장',
  headerTitleAlign: 'center',
};

const renderHeader = (
  navigation: StackNavigationProp<EditRouteStackParamList, keyof EditRouteStackParamList>,
) => ({
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="backBtn"
        iconWidth="27px"
        iconHeight="20px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
  headerRight: () => (
    <HeaderRight>
      <IconButton
        isFontIcon={false}
        imagePath="x"
        iconWidth="27px"
        iconHeight="20px"
        onPress={() => navigation.popToTop()}
      />
    </HeaderRight>
  ),
});

const renderHeaderLeft = (
  navigation: StackNavigationProp<EditRouteStackParamList, keyof EditRouteStackParamList>,
): StackNavigationOptions => ({
  title: '저장한 경로',
  headerTitleAlign: 'left',
  headerStyle: { backgroundColor: COLOR.LIGHT_GRAY },
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="backBtn"
        iconWidth="27px"
        iconHeight="20px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
});

const EditRouteNavigation = () => {
  return (
    <Stack.Navigator screenOptions={screenOption}>
      <Stack.Screen
        name={SAVED_ROUTES}
        component={SavedRoutesScreen}
        options={({ navigation }) => renderHeaderLeft(navigation)}
      />
      <Stack.Screen
        name={ADD_NEW_ROUTE}
        component={AddNewRouteScreen}
        options={({ navigation }) => renderHeader(navigation)}
      />
      <Stack.Screen
        name={SUBWAY_SEARCH}
        component={NewRouteSearchScreen}
        options={({ navigation }) => renderHeader(navigation)}
        initialParams={{ isBackBtn: false }}
      />
      <Stack.Screen
        name={SUBWAY_PATH_RESULT}
        component={SelectNewRouteScreen}
        options={({ navigation }) => renderHeader(navigation)}
      />
      <Stack.Screen
        name={SUBWAY_PATH_DETAIL}
        component={NewRoutePathDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={NAME_NEW_ROUTE}
        component={NameNewRouteScreen}
        options={({ navigation }) => renderHeader(navigation)}
      />
    </Stack.Navigator>
  );
};

export default EditRouteNavigation;

const HeaderLeft = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;

const HeaderRight = styled.View`
  margin-right: 10px;
  flex-direction: row;
`;

export const useEditRouteNavigation = <RouteName extends keyof EditRouteStackParamList>() => {
  return useNavigation<StackNavigationProp<EditRouteStackParamList, RouteName>>();
};
