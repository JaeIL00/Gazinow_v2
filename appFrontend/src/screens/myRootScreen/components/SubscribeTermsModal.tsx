import { COLOR } from '@/global/constants';
import { Pressable, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';
import IconCrossX from '@assets/icons/cross_x.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';

const SubscribeTermsModal = () => {
  const myPageNavigation = useMyPageNavigation();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.WHITE }}>
      <View
        style={{
          paddingLeft: 16,
          paddingTop: 13,
          paddingBottom: 10,
          backgroundColor: COLOR.WHITE,
          borderBottomWidth: 1,
          borderBottomColor: COLOR.GRAY_DDD,
        }}
      >
        <Pressable hitSlop={20} onPress={() => myPageNavigation.goBack()}>
          <IconCrossX width="24px" />
        </Pressable>
      </View>
      <WebView
        source={{
          uri: 'https://gilded-turn-6c9.notion.site/ver-1-10f4eab4c1c842cab3539cdd013dc0c7',
        }}
      />
    </SafeAreaView>
  );
};

export default SubscribeTermsModal;
