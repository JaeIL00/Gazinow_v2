import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import type { StackNavigationOptions, StackNavigationProp } from '@react-navigation/stack';

import { COLOR, SUBWAY_PATH_RESULT } from '@/global/constants';
import {
  HOME,
  SUBWAY_PATH_DETAIL,
} from '@/global/constants/navigation';
import { HomeStackParamList } from '@/navigation/types/navigation';
import SearchPathResultScreen from '@/screens/searchPathResultScreen';
import SearchPathResultDetailScreen from '@/screens/searchPathResultDetailScreen';
import HomeScreen from '@/screens/homeScreen';
import SavedRoutesScreen from '@/screens/savedRoutesScreen';
import styled from '@emotion/native';
import { IconButton } from '@/global/ui';

const Stack = createStackNavigator<HomeStackParamList>();

const screenOption = {
  headerShown: false,
};

const renderHeaderLeft = (
  navigation: StackNavigationProp<HomeStackParamList, keyof HomeStackParamList>,
): StackNavigationOptions => ({
  headerShown: true,
  title: '저장한 경로',
  headerTitleAlign: 'left',
  headerTitleStyle: { color: '#171717', fontSize: 18, lineHeight: 23, fontWeight: '500' },
  headerStyle: { backgroundColor: COLOR.GRAY_F9 },
  headerLeft: () => (
    <HeaderLeft>
      <IconButton
        isFontIcon={false}
        imagePath="backBtn"
        iconWidth="24px"
        iconHeight="24px"
        onPress={() => navigation.goBack()}
      />
    </HeaderLeft>
  ),
});

const HomeNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={HOME} screenOptions={screenOption}>
      {/* <Stack.Screen
        name={SUBWAY_SEARCH}
        component={SubwaySearchScreen}
        initialParams={{ isBackBtn: true }}
      /> */}
      <Stack.Screen name={HOME} component={HomeScreen} />
      <Stack.Screen name={SUBWAY_PATH_RESULT} component={SearchPathResultScreen} />
      <Stack.Screen name={SUBWAY_PATH_DETAIL} component={SearchPathResultDetailScreen} />
      <Stack.Screen
        name="SavedRoutes"
        component={SavedRoutesScreen}
        options={({ navigation }) => renderHeaderLeft(navigation)}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
const HeaderLeft = styled.View`
  margin-left: 10px;
  flex-direction: row;
`;

export const useHomeNavigation = <RouteName extends keyof HomeStackParamList>() => {
  return useNavigation<StackNavigationProp<HomeStackParamList, RouteName>>();
};
