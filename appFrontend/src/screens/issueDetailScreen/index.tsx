import { getEncryptedStorage } from '@/global/utils';
import { useAppSelect } from '@/store';
import { useRef } from 'react';
import { SafeAreaView } from 'react-native';
import WebView from 'react-native-webview';
import { useQuery } from 'react-query';

const IssueDetailScreen = () => {
  const issueId = useAppSelect((state) => state.subwaySearch.issueId);

  const webViewRef = useRef<WebView>(null);
  const { data: accessToken } = useQuery(['access-token'], () =>
    getEncryptedStorage('access_token'),
  );

  return (
    <SafeAreaView>
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
