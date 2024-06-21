import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import IconCrossX from '@assets/icons/cross_x.svg';
import { useAuthNavigation } from '@/navigation/AuthNavigation';
import { useRoute } from '@react-navigation/native';
import { SocialLoginType } from './SocialLoginButtons';
import { API_BASE_URL } from '@env';

const SocialLoginScreen = () => {
  const authNavigation = useAuthNavigation();
  const { socialLoginType } = useRoute().params as { socialLoginType: SocialLoginType };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableOpacity className="pl-16 pt-13 pb-10" onPress={() => authNavigation.goBack()}>
        <IconCrossX width="24px" />
      </TouchableOpacity>
      <View className="bg-gray-eb h-1" />
      <WebView
        source={{
          uri: `${API_BASE_URL}/api/v1/oauth/login?socialLoginType=${socialLoginType}`,
        }}
      />
    </SafeAreaView>
  );
};

export default SocialLoginScreen;
