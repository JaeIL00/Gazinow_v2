import { Platform, Pressable, SafeAreaView, View } from 'react-native';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
// import { RESULTS, requestNotifications } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/configureStore';
import packageJson from '../../../package.json';
import IconPencil from '@assets/icons/pencil.svg';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import VersionCheck from 'react-native-version-check';
import { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface RenderMenuProps {
  text: string;
  onPress?: () => void;
  versionText?: string;
}
// const ALLOWED_PERMISSIONS = {
//   [RESULTS.GRANTED]: true,
//   [RESULTS.LIMITED]: true,
//   [RESULTS.UNAVAILABLE]: true,
//   [RESULTS.BLOCKED]: false,
//   [RESULTS.DENIED]: false,
// };

const requestNotificationPermission = async () => {
  // const { status } = await requestNotifications(['alert']);
  // return ALLOWED_PERMISSIONS[status];
};

const MyRootScreen = () => {
  const rootNavigation = useRootNavigation();
  const { nickname, email, isVerifiedUser } = useSelector((state: RootState) => state.auth);
  const currentVersionInfo = packageJson.version;

  const [versionText, setVersionText] = useState<string>('');

  const confirmUserNotificationOn = async () => {
    // const result = await requestNotificationPermission();
    // if (!result) {
    //   setIsNotiOnScreenOpen(true);
    // } else {
    //   setIsNotiSettingsScreenOpen(true);
    // }
  };

  useEffect(() => {
    VersionCheck.getLatestVersion({
      provider: Platform.OS === 'ios' ? 'appStore' : 'playStore',
    }).then((latestVersion) => {
      if (currentVersionInfo === latestVersion) setVersionText(`v${latestVersion} 최신버전 입니다`);
      else setVersionText(`v${currentVersionInfo}`);
    });
  }, []);

  const renderMenu = ({ text, onPress, versionText }: RenderMenuProps) => (
    <>
      <TouchableOpacity
        className="flex-row items-center justify-between px-16 h-53"
        onPress={onPress}
        disabled={versionText ? true : false}
      >
        <FontText value={text} textSize="16px" textWeight="Regular" lineHeight={21} />
        {versionText ? (
          <FontText value={versionText} textSize="12px" textWeight="Regular" lineHeight={17} />
        ) : (
          <IconRightArrowHead width={14} color={COLOR.GRAY_999} />
        )}
      </TouchableOpacity>
      <View className="h-1 bg-gray-eb" />
    </>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-f9">
      <View className="pl-16 pt-45 pb-37">
        {isVerifiedUser !== 'success auth' ? (
          <Pressable
            className="flex-row items-center space-x-6"
            onPress={() => rootNavigation.navigate('AuthStack', { screen: 'Landing' })}
          >
            <FontText value="로그인하세요" textSize="18px" textWeight="SemiBold" />
            <IconRightArrowHead
              width={11}
              height={11}
              strokeWidth={1.2}
              color={COLOR.BASIC_BLACK}
            />
          </Pressable>
        ) : (
          <>
            <TouchableOpacity
              className="flex-row items-center space-x-5"
              hitSlop={20}
              onPress={() =>
                rootNavigation.navigate('MyPageNavigation', { screen: 'ChangeNickNameScreen' })
              }
            >
              <FontText value={nickname} textSize="18px" lineHeight={23} textWeight="SemiBold" />
              <IconPencil width={18} />
            </TouchableOpacity>

            <FontText
              value={email}
              textSize="14px"
              lineHeight={21}
              textWeight="Regular"
              textColor={COLOR.GRAY_999}
            />
          </>
        )}
      </View>
      <View className="flex-1 bg-white">
        {isVerifiedUser === 'success auth' &&
          renderMenu({
              text: '계정 관리',
              onPress: () =>
                rootNavigation.navigate('MyPageNavigation', { screen: 'ManageAccountScreen' }),
            })}
        {/* TODO: 페이지 들어가서 퍼미션 컨펌창 띄우는 로직으로 수정하기 */}
        {/* {renderMenu({ text: '알림 설정', onPress: () => confirmUserNotificationOn() })} */}
        {renderMenu({
          text: '약관 및 정책',
          onPress: () =>
            rootNavigation.navigate('MyPageNavigation', {
              screen: 'SubscribeTermsScreen',
            }),
        })}
        {renderMenu({
          text: '개인정보처리방침',
          onPress: () =>
            rootNavigation.navigate('MyPageNavigation', {
              screen: 'PersonalTermsScreen',
            }),
        })}
        {renderMenu({ text: '버전', versionText })}
      </View>
    </SafeAreaView>
  );
};

export default MyRootScreen;
