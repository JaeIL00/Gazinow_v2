import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HOME } from '@/global/constants';
import HomeScreen from '@/screens/homeScreen';

const Tab = createBottomTabNavigator();

const screenOption = {
  headerShown: false,
};

const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={HOME} screenOptions={screenOption}>
      <Tab.Screen name={HOME} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigation;
