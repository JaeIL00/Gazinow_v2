import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HOME } from '@/constants';
import { HomePage } from '@/pages/home';

const Tab = createBottomTabNavigator();

const screenOption = {
  headerShown: false,
};

const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={HOME} screenOptions={screenOption}>
      <Tab.Screen name={HOME} component={HomePage} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigation;
