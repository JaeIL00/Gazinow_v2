import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useState } from 'react';
import { Switch } from 'react-native';

const NotificationSettingsScreen = () => {
  const navigation = useRootNavigation();
  navigation.setOptions({
    headerRight: () => (
      <TextButton
        value="완료    "
        textSize="16px"
        textColor={COLOR.GRAY_999}
        textWeight="Medium"
        lineHeight="21px"
        onPress={() => submitNotificationSettings()}
      />
    ),
  });

  const submitNotificationSettings = () => {};

  const [pushNotification, setPushNotification] = useState(false);
  const [savedPathNotification, setSavedPathNotification] = useState(true);
  const [newsNotification, setNewsNotification] = useState(true);

  const handlePushNotificationToggle = () => {
    setPushNotification(!pushNotification);
  };

  return (
    <Container>
      <MenuContainer>
        <TextButton value="푸시 알림 받기" textSize="16px" textWeight="Regular" lineHeight="21px" />
        <Switch value={pushNotification} onValueChange={handlePushNotificationToggle} />
      </MenuContainer>
      {pushNotification && (
        <>
          <Space height="20px" backgroundColor={COLOR.GRAY_F9} />
          <MenuContainer>
            <TextButton
              value="내가 저장한 경로 알림"
              textSize="16px"
              textWeight="Regular"
              lineHeight="21px"
            />
            <Switch
              value={savedPathNotification}
              onValueChange={() => setSavedPathNotification(!savedPathNotification)}
            />
          </MenuContainer>
          <MenuContainer>
            <TextButton
              value="새소식 알림"
              textSize="16px"
              textWeight="Regular"
              lineHeight="21px"
            />
            <Switch
              value={newsNotification}
              onValueChange={() => setNewsNotification(!newsNotification)}
            />
          </MenuContainer>
        </>
      )}
    </Container>
  );
};
export default NotificationSettingsScreen;

const Container = styled.View`
  background-color: white;
  flex: 1;
`;
const MenuContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  height: 53px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;
