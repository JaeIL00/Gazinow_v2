import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { COLOR, HOME, MY_ROOT } from '@/global/constants';
import MyRootScreen from '@/screens/myRootScreen';
import HomeNavigation from './HomeNavigation';
import NowScreen from '@screens/nowScreen';
import FocusedMap from '@assets/icons/tab_map.svg';
import UnFocusedMap from '@assets/icons/tab_map_border.svg';
import Now from '@assets/icons/tab_now.svg';
import My from '@assets/icons/tab_my.svg';
import { FontText } from '@/global/ui';
import { Platform, View } from 'react-native';

const Tab = createBottomTabNavigator();

const screenOption: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarItemStyle: { paddingTop: 8, paddingBottom: 7 },
  tabBarStyle: {
    backgroundColor: COLOR.GRAY_F9,
    height: Platform.OS === 'ios' ? 79 + 5 : 49 + 5,
  },
};

const MainBottomTabNavigation = () => {
  return (
    <Tab.Navigator initialRouteName={HOME} screenOptions={screenOption}>
      <Tab.Screen
        name="homeStack"
        component={HomeNavigation}
        options={{
          tabBarLabel: ({ focused }) => (
            <FontText
              value="홈"
              textSize="10px"
              textWeight="SemiBold"
              textColor={focused ? COLOR.LIGHT_BLUE : COLOR.GRAY_7D}
              style={{ marginTop: 5 }}
            />
          ),
          tabBarIcon: ({ focused }) => {
            return <>{focused ? <FocusedMap /> : <UnFocusedMap />}</>;
          },
        }}
      />
      <Tab.Screen
        name="NowScreen"
        component={NowScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <FontText
              value="NOW"
              textSize="10px"
              textWeight="SemiBold"
              textColor={focused ? COLOR.LIGHT_BLUE : COLOR.GRAY_7D}
              style={{ marginTop: 5 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <Now
              color={focused ? COLOR.LIGHT_BLUE : 'transparent'}
              strokeWidth={focused ? 0 : 1}
              stroke={COLOR.GRAY_7D}
            />
          ),
        }}
      />
      <Tab.Screen
        name={MY_ROOT}
        component={MyRootScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <FontText
              value="마이"
              textSize="10px"
              textWeight="SemiBold"
              textColor={focused ? COLOR.LIGHT_BLUE : COLOR.GRAY_7D}
              style={{ marginTop: 5 }}
            />
          ),
          tabBarIcon: ({ focused }) => (
            <My
              color={focused ? COLOR.LIGHT_BLUE : 'transparent'}
              strokeWidth={focused ? 0 : 1}
              stroke={COLOR.GRAY_7D}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainBottomTabNavigation;
