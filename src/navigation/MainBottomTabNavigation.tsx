import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { HOME } from '@/constants';
import { HomePage } from '@/pages/home';
import { CompositeScreenProps } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation';
import { BottomTabScreenProps as BottomTabProps } from '@react-navigation/bottom-tabs';

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
