import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import IconCrossX from '@assets/icons/cross_x.svg';
import { useMyPageNavigation } from '@/navigation/MyPageNavigation';

const SubscribeTermsScreen = () => {
  const myPageNavigation = useMyPageNavigation();
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="pl-16 pt-13 pb-10" onPress={() => myPageNavigation.goBack()}>
        <IconCrossX width="24px" />
      </TouchableOpacity>
      <View className="bg-gray-eb h-1" />
      <WebView
        source={{
          uri: 'https://reflective-pincushion-d6c.notion.site/ver-1-12bd734b37b34bbaa58741e7f72bbda0',
        }}
      />
    </SafeAreaView>
  );
};

export default SubscribeTermsScreen;
