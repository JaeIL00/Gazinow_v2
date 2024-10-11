import { useEffect } from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';
import { useHomeNavigation } from '../../navigation/HomeNavigation';

export const pushNotification = () => {
  // 포그라운드 알림 수신
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      onMessageReceived(remoteMessage);
    });
    return unsubscribe;
  }, []);

  // 백그라운드 알림 수신 및 표시
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {});

  // 포그라운드 알림 화면에 표시
  const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const { title, body } = message.notification!;

    // 채널 생성
    const channelId = await notifee.createChannel({
      // Miscellaneous 채널 삭제, Important Notifications로 통임
      id: 'fcm_fallback_notification_channel',
      name: 'Important Notifications',
      importance: AndroidImportance.HIGH,
    });

    // 디바이스에 알림 표시
    await notifee.displayNotification({
      title,
      body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PUBLIC,
        timeoutAfter: 2000,
      },
    });
  };
};
