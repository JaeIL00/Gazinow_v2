import { StackNavigationProp, createStackNavigator } from '@react-navigation/stack';
import { AuthStackStackParamList } from './types/navigation';
import LandingScreen from '@/screens/landingScreen';
import SignInScreen from '@/screens/signInScreen';
import SignUpScreen from '@/screens/signUpScreen';
import SocialLoginScreen from '@/screens/landingScreen/components/SocialLoginScreen';
import { useNavigation } from '@react-navigation/native';

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
      <Stack.Screen name="SocialLogin" component={SocialLoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

export const useAuthNavigation = <RouteName extends keyof AuthStackStackParamList>() => {
  return useNavigation<StackNavigationProp<AuthStackStackParamList, RouteName>>();
};
