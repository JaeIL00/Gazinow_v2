import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { Image } from 'react-native';
import { iconPath } from '@/assets/icons/iconPath';
import { FontText, IconButton, Space, TextButton } from '@/global/ui';
import { COLOR, MY_NAVIGATION } from '@/global/constants';
import {
  ACCOUNT_MANAGE,
  CHANGE_NICKNAME,
  CONTRACT,
  NOTIFICATION_SETTINGS,
} from '@/global/constants/navigation';
interface RenderMenuProps {
  text: string;
  onPress?: () => void;
  versionInfo?: string;
}

const MyRootScreen = () => {
  const nickName = '사용자17349245';
  const userEmail = 'abcdef@naver.com';
  const versionInfo = '0.0.0';
  const navigation = useRootNavigation();

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
            navigation.push(MY_NAVIGATION, { screen: CHANGE_NICKNAME });
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
              navigation.push(MY_NAVIGATION, { screen: CHANGE_NICKNAME });
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
      {renderMenu({
        text: '계정 관리',
        onPress: () => navigation.push(MY_NAVIGATION, { screen: ACCOUNT_MANAGE }),
      })}
      {renderMenu({
        text: '알림 설정',
        onPress: () => navigation.push(MY_NAVIGATION, { screen: NOTIFICATION_SETTINGS }),
      })}
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
  background-color: ${COLOR.LIGHT_GRAY};
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
