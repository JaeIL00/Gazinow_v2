import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HomePage } from '@/components/home/page';
import { HOME } from '@/constants';

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
