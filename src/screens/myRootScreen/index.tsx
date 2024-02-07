import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Image } from 'react-native';
import { iconPath } from '@/assets/icons/iconPath';
import { FontText, IconButton, Space, TextButton } from '@/global/ui';
import { COLOR, MY_NAVIGATION } from '@/global/constants';
import {
  ACCOUNT_MANAGE,
  CONTRACT,
  NOTIFICATION,
  NOTIFICATION_SETTINGS,
} from '@/global/constants/navigation';
import { RESULTS, requestNotifications } from 'react-native-permissions';
import { useState } from 'react';
import ChangeNickNameModal from './components/ChangeNickNameModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';

interface RenderMenuProps {
  text: string;
  onPress?: () => void;
  versionInfo?: string;
}

const ALLOWED_PERMISSIONS = {
  [RESULTS.GRANTED]: true,
  [RESULTS.LIMITED]: true,
  [RESULTS.UNAVAILABLE]: true,
  [RESULTS.BLOCKED]: false,
  [RESULTS.DENIED]: false,
};

const requestNotificationPermission = async () => {
  const { status } = await requestNotifications(['alert']);
  return ALLOWED_PERMISSIONS[status];
};

const MyRootScreen = () => {
  const nickName = useSelector((state: RootState) => state.auth.nickname);
  const userEmail = useSelector((state: RootState) => state.auth.email);
  const versionInfo = '0.0.0';
  const navigation = useRootNavigation();
  const [isNicknameModalOpen, setIsNicknameModalOpen] = useState<boolean>(false);

  const confirmUserNotificationOn = async () => {
    const result = await requestNotificationPermission();
    if (!result) {
      navigation.push(MY_NAVIGATION, { screen: NOTIFICATION });
    } else {
      navigation.push(MY_NAVIGATION, { screen: NOTIFICATION_SETTINGS });
    }
  };

  const renderMenu = ({ text, onPress, versionInfo }: RenderMenuProps) => (
    <MenuContainer onPress={onPress}>
      <TextButton
        value={text}
        textSize="16px"
        textWeight="Regular"
        lineHeight="21px"
        onPress={onPress}
      />
      {versionInfo ? (
        <FontText
          value={`v ${versionInfo} 최신버전입니다`}
          textSize="12px"
          textWeight="Regular"
          lineHeight="17px"
        />
      ) : (
        <Image
          source={iconPath.backBtn}
          style={{ width: 14, height: 17, transform: [{ scaleX: -1 }] }}
        />
      )}
    </MenuContainer>
  );

  return (
    <Container>
      <ProfileContainer>
        <NickNameContainer
          onPress={() => {
            setIsNicknameModalOpen(true);
          }}
        >
          <FontText value={nickName} textSize="16px" textWeight="Medium" lineHeight="21px" />
          <Space width="5px" />
          <IconButton
            iconType="Ionicons"
            isFontIcon
            iconName="pencil"
            iconWidth="15"
            iconColor={COLOR.GRAY_999}
            onPress={() => {
              setIsNicknameModalOpen(true);
            }}
          />
        </NickNameContainer>
        <FontText
          value={userEmail}
          textSize="12px"
          textWeight="Regular"
          lineHeight="15px"
          textColor={COLOR.GRAY_999}
        />
      </ProfileContainer>
      {isNicknameModalOpen && (
        <ChangeNickNameModal onCancel={() => setIsNicknameModalOpen(false)} />
      )}
      {renderMenu({
        text: '계정 관리',
        onPress: () => navigation.push(MY_NAVIGATION, { screen: ACCOUNT_MANAGE }),
      })}
      {renderMenu({ text: '알림 설정', onPress: () => confirmUserNotificationOn() })}
      {/* {renderMenu({ text: '알림 설정', onPress: () => navigation.push(MY_PAGE_NAVIGATION, { screen: NOTIFICATION_SETTINGS_PAGE }) })} */}
      {renderMenu({
        text: '약관 및 정책',
        onPress: () => navigation.push(MY_NAVIGATION, { screen: CONTRACT }),
      })}
      {renderMenu({ text: '버전', versionInfo })}
    </Container>
  );
};

export default MyRootScreen;

const Container = styled.View`
  background-color: white;
  flex: 1;
`;
const NickNameContainer = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const ProfileContainer = styled.Pressable`
  padding: 45px 16px;
  background-color: ${COLOR.GRAY_F9};
`;
const MenuContainer = styled.Pressable`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  height: 53px;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${COLOR.GRAY_EB};
`;
