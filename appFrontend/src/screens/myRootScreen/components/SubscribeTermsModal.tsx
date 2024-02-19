import { COLOR } from '@/global/constants';
import { Modal, Pressable, SafeAreaView, View } from 'react-native';
import { WebView } from 'react-native-webview';
import IconCrossX from '@assets/icons/cross_x.svg';

interface SubscribeTermsModalProps {
  closeModal: () => void;
}

const SubscribeTermsModal = ({ closeModal }: SubscribeTermsModalProps) => (
  <Modal onRequestClose={closeModal}>
    <SafeAreaView style={{ flex: 1 }}>
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
        <Pressable hitSlop={20} onPress={closeModal}>
          <IconCrossX width="24px" />
        </Pressable>
      </View>
      <WebView
        source={{
          uri: 'https://gilded-turn-6c9.notion.site/ver-1-10f4eab4c1c842cab3539cdd013dc0c7',
        }}
      />
    </SafeAreaView>
  </Modal>
);

export default SubscribeTermsModal;
