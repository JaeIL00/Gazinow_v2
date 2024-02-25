import { COLOR } from '@/global/constants';
import { FontText, Space } from '@/global/ui';
import { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import IconCheck from '@assets/icons/check.svg';
import { WebView } from 'react-native-webview';
import StepButton from '../ui/StepButton';
import IconX from '@assets/icons/cross_x.svg';
import IconRightArrowHead from '@assets/icons/right_arrow_head.svg';

type AgreeTermsType = '약관 전체 동의' | '(필수) 서비스 약관 동의' | '(필수) 개인정보 수집 동의';

const listData: AgreeTermsType[] = ['(필수) 서비스 약관 동의', '(필수) 개인정보 수집 동의'];

interface SubscribeTermsModalProps {
  setStep: () => void;
  closeModal: () => void;
}

const SubscribeTermsModal = ({ setStep, closeModal }: SubscribeTermsModalProps) => {
  const height = Dimensions.get('window').height;

  const animRef = useRef(new Animated.Value(height)).current;

  const [openUrl, setOpenUrl] = useState<string>('');
  const [agreeTerms, setAgreeTerms] = useState<AgreeTermsType[]>([]);

  const isCheckAll = agreeTerms.includes('약관 전체 동의');

  const changeAgreeTerms = (text: AgreeTermsType) => {
    const isExist = agreeTerms.includes(text);
    if (isExist) {
      if (agreeTerms.includes('약관 전체 동의')) {
        setAgreeTerms((prev) => prev.filter((item) => item !== text && item !== '약관 전체 동의'));
        return;
      }
      setAgreeTerms((prev) => prev.filter((item) => item !== text));
    } else {
      if (agreeTerms.length === 2) {
        setAgreeTerms((prev) => [...prev, text, '약관 전체 동의']);
        return;
      }
      setAgreeTerms((prev) => [...prev, text]);
    }
  };

  const allChangeAgreeTerms = () => {
    if (isCheckAll) setAgreeTerms([]);
    else setAgreeTerms(['약관 전체 동의', '(필수) 개인정보 수집 동의', '(필수) 서비스 약관 동의']);
  };

  const webViewHandler = (text: AgreeTermsType) => {
    switch (text) {
      case '(필수) 서비스 약관 동의':
        setOpenUrl(
          'https://reflective-pincushion-d6c.notion.site/ver-1-12bd734b37b34bbaa58741e7f72bbda0',
        );
        break;
      case '(필수) 개인정보 수집 동의':
        setOpenUrl(
          'https://reflective-pincushion-d6c.notion.site/ver-1-c94b91a436814e3f86881f9f144f8581?pvs=4',
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    Animated.timing(animRef, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Modal visible onRequestClose={!!openUrl ? () => setOpenUrl('') : closeModal} transparent>
      {!!openUrl ? (
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
            <TouchableOpacity hitSlop={20} activeOpacity={1} onPress={() => setOpenUrl('')}>
              <IconX width={24} height={24} />
            </TouchableOpacity>
          </View>
          <WebView source={{ uri: openUrl }} />
        </SafeAreaView>
      ) : (
        <>
          {/* 백그라운드 */}
          <View
            style={{
              backgroundColor: '#00000099',
              flex: 1,
              // paddingTop: '69%',
              justifyContent: 'flex-end',
            }}
          >
            <Animated.View
              style={{
                height: '65%',
                backgroundColor: COLOR.WHITE,
                borderTopStartRadius: 14,
                borderTopEndRadius: 14,
                paddingTop: 33,
                paddingHorizontal: 16,
                transform: [{ translateY: animRef }],
              }}
            >
              <Pressable
                hitSlop={10}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 15,
                  paddingVertical: 13,
                  paddingLeft: 10,
                  backgroundColor: COLOR.GRAY_F9,
                  borderRadius: 5,
                }}
                onPress={allChangeAgreeTerms}
              >
                <View
                  style={{
                    borderRadius: 3,
                    backgroundColor: COLOR.GRAY_E3,
                    width: 22,
                    height: 22,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {agreeTerms.includes('약관 전체 동의') && (
                    <IconCheck width={18} height={18} color={COLOR.WHITE} />
                  )}
                </View>
                <Space width="10px" />
                <FontText
                  value="약관 전체 동의"
                  textSize="14px"
                  textWeight="SemiBold"
                  textColor={COLOR.BASIC_BLACK}
                />
              </Pressable>

              <View style={{ flex: 1 }}>
                {listData.map((text) => (
                  <Pressable
                    key={text}
                    hitSlop={10}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: 24,
                      paddingLeft: 10,
                    }}
                    onPress={() => changeAgreeTerms(text)}
                  >
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <View
                        style={{
                          borderRadius: 3,
                          backgroundColor: COLOR.GRAY_E3,
                          width: 22,
                          height: 22,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        {agreeTerms.includes(text) && (
                          <IconCheck width={18} height={18} color={COLOR.WHITE} />
                        )}
                      </View>
                      <Space width="10px" />
                      <FontText
                        value={text}
                        textSize="14px"
                        textWeight="SemiBold"
                        textColor={COLOR.BASIC_BLACK}
                      />
                    </View>
                    <TouchableOpacity hitSlop={20} onPress={() => webViewHandler(text)}>
                      <IconRightArrowHead width={12} height={12} color={COLOR.GRAY_CA} />
                    </TouchableOpacity>
                  </Pressable>
                ))}
              </View>

              <StepButton
                value="완료"
                backgroundCondition={isCheckAll}
                onPress={setStep}
                disabled={!isCheckAll}
              />
            </Animated.View>
          </View>
        </>
      )}
    </Modal>
  );
};

export default SubscribeTermsModal;
