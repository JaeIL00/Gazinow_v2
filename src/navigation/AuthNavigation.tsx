import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackStackParamList } from './types/navigation';
import LandingScreen from '@/screens/landingScreen';
import SignInScreen from '@/screens/signInScreen';
import SignUpScreen from '@/screens/signUpScreen';

const Stack = createStackNavigator<AuthStackStackParamList>();

const screenOption = {
  headerShown: false,
};

const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={screenOption}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
