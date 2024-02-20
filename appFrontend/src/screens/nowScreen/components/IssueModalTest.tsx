import React, { useRef } from 'react';
import { Modal } from 'react-native';
import WebView from 'react-native-webview';
import { getEncryptedStorage } from '@/global/utils';
import { useQuery } from 'react-query';

interface IssueDetailProps {
  id: number;
  onRequestClose: () => void;
}

const IssueModalTest = ({ id, onRequestClose }: IssueDetailProps) => {
  const webViewRef = useRef<WebView>(null);
  const { data: accessToken } = useQuery(['access-token'], () =>
    getEncryptedStorage('access_token'),
  );

  return (
    <Modal onRequestClose={onRequestClose}>
      <WebView
        ref={webViewRef}
        source={{ uri: `https://www.gazinow.com/issue/${id}` }}
        onLoadStart={() => {
          webViewRef.current?.postMessage(accessToken);
        }}
      />
    </Modal>
  );
};

export default IssueModalTest;
