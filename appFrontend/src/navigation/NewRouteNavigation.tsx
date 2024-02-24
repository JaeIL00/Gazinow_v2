import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { NewRouteStackParamList } from './types/navigation';
import SwapScreen from '@/screens/savedRoutesScreen/components/NewSearchSwapStation';
import SearchScreen from '@/screens/savedRoutesScreen/components/NewSearchStation';
import ResultScreen from '@/screens/savedRoutesScreen/components/SelectNewRouteModal';
import DetailScreen from '@/screens/savedRoutesScreen/components/NewRouteDetailModal';
import NameScreen from '@/screens/savedRoutesScreen/components/NameNewRouteModal';
import { useNavigation } from '@react-navigation/native';
import SavedRoutesScreen from '@/screens/savedRoutesScreen';

const Stack = createStackNavigator<NewRouteStackParamList>();

const screenOption = {
  headerShown: false,
};

const NewRouteNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SavedRoutes" screenOptions={screenOption}>
      <Stack.Screen name="SavedRoutes" component={SavedRoutesScreen} />
      <Stack.Screen name="Swap" component={SwapScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      {/* <Stack.Screen name="Detail" component={DetailScreen} /> */}
      <Stack.Screen name="Name" component={NameScreen} />
    </Stack.Navigator>
  );
};

export default NewRouteNavigation;

export const useNewRouteNavigation = <RouteName extends keyof NewRouteStackParamList>() => {
  return useNavigation<StackNavigationProp<NewRouteStackParamList, RouteName>>();
};
