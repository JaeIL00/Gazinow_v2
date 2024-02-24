import { COLOR } from '@/global/constants';
import { getEncryptedStorage } from '@/global/utils';
import { useAppSelect } from '@/store';
import { useRef } from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { useQuery } from 'react-query';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';

const IssueDetailScreen = () => {
  const navigation = useRootNavigation();
  const issueId = useAppSelect((state) => state.subwaySearch.issueId);

  const webViewRef = useRef<WebView>(null);
  const { data: accessToken } = useQuery(['access-token'], () =>
    getEncryptedStorage('access_token'),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16, backgroundColor: COLOR.GRAY_F9 }}>
        <TouchableOpacity activeOpacity={1} hitSlop={20} onPress={() => navigation.goBack()}>
          <IconLeftArrowHead />
        </TouchableOpacity>
      </View>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://www.gazinow.com/issue/${issueId}` }}
        onLoadEnd={() => {
          webViewRef.current?.postMessage(accessToken);
        }}
      />
    </SafeAreaView>
  );
};

export default IssueDetailScreen;
