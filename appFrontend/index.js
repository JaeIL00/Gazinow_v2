/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// TODO: 프로덕션 배포 시 주석처리하기
// if (__DEV__) {
//   require('./ReactotronConfig');
// }

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  await AsyncStorage.setItem('pushNotiParams', remoteMessage.data?.path);
});

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
