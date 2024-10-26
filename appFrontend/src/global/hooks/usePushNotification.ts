import { useEffect } from 'react';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, AndroidVisibility, EventType } from '@notifee/react-native';
import { useRootNavigation } from '@/navigation/RootNavigation';

const rootNavigation = useRootNavigation();

export const usePushNotification = () => {
  // 포그라운드 알림 수신
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      displayReceivedNotification(remoteMessage);
      notifee.onForegroundEvent(async ({ type }) => {
        if (type === EventType.PRESS) {
          await handleNotificationPress(remoteMessage);
        }
      });
    });
    return unsubscribe;
  }, []);

  // 백그라운드 알림 수신 및 표시
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    //FIXME: 앱 종료 후 푸시알림 클릭 시 경로 상세화면으로 이동하지 않음
    if (EventType.ACTION_PRESS) {
      await handleNotificationPress(remoteMessage);
    }
  });

  // 포그라운드 알림 화면에 표시
  const displayReceivedNotification = async (message: FirebaseMessagingTypes.RemoteMessage) => {
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
        timeoutAfter: 5000,
      },
    });
  };

  // remoteMessage의 data를 객체 형태로 파싱 후 화면 이동
  const handleNotificationPress = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const pathJsonString = message.data?.path;

    const parseJsonString = (pathJsonString: string) => {
      try {
        return JSON.parse(pathJsonString);
      } catch (error) {
        console.error('JSON 파싱 오류:', error);
      }
    };

    const parsedPathObject = parseJsonString(pathJsonString as string);

    await rootNavigation.navigate('SubwayPathDetail', { state: parsedPathObject });
  };
};
