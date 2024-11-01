/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

// TODO: 프로덕션 배포 시 주석처리하기
// if (__DEV__) {
//   require('./ReactotronConfig');
// }

function HeadlessCheck({ isHeadless }) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);

// AppRegistry.registerComponent(appName, () => App);
