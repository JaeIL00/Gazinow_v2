import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HOME, MY_ROOT } from '@/global/constants';
import HomeScreen from '@/screens/homeScreen';
import MyRootScreen from '@/screens/MyRootScreen';

const Tab = createBottomTabNavigator();

const screenOption = {
  headerShown: false,
};

const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={HOME} screenOptions={screenOption}>
      <Tab.Screen name={HOME} component={HomeScreen} options={{ tabBarLabel: '홈' }} />
      <Tab.Screen name={MY_ROOT} component={MyRootScreen} options={{ tabBarLabel: '마이' }} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigation;
