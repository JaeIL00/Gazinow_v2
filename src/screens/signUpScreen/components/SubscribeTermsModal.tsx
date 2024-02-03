import { COLOR } from '@/global/constants';
import { FontText, IconButton, Space, TextButton } from '@/global/ui';
import { useState } from 'react';
import { Modal, Pressable, View } from 'react-native';
import CheckIcon from 'react-native-vector-icons/Feather';
import { WebView } from 'react-native-webview';

type AgreeTermsType =
  | '약관 전체 동의'
  | '(필수) 서비스 약관 동의'
  | '(필수) 개인정보 수집 동의'
  | '(필수) 위치기반 서비스 이용 동의';

const listData: AgreeTermsType[] = [
  '(필수) 서비스 약관 동의',
  '(필수) 개인정보 수집 동의',
  '(필수) 위치기반 서비스 이용 동의',
];

interface SubscribeTermsModalProps {
  setStep: () => void;
  closeModal: () => void;
}

const SubscribeTermsModal = ({ setStep, closeModal }: SubscribeTermsModalProps) => {
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
    else
      setAgreeTerms([
        '약관 전체 동의',
        '(필수) 개인정보 수집 동의',
        '(필수) 서비스 약관 동의',
        '(필수) 위치기반 서비스 이용 동의',
      ]);
  };

  const webViewHandler = (text: AgreeTermsType) => {
    switch (text) {
      case '(필수) 서비스 약관 동의':
        setOpenUrl('https://gilded-turn-6c9.notion.site/ver-1-10f4eab4c1c842cab3539cdd013dc0c7');
        break;
      case '(필수) 개인정보 수집 동의':
        setOpenUrl('https://gilded-turn-6c9.notion.site/ver-1-6992d062c19a466aaf4e37db4df2498b');
        break;
      case '(필수) 위치기반 서비스 이용 동의':
        setOpenUrl('https://gilded-turn-6c9.notion.site/ver-1-9eabbc4300464d07adc940a1c7c33840');
        break;
      default:
        break;
    }
  };

  return (
    <Modal
      visible
      onRequestClose={!!openUrl ? () => setOpenUrl('') : closeModal}
      transparent
      // statusBarTranslucent
      // presentationStyle="overFullScreen"
    >
      {!!openUrl ? (
        <View style={{ flex: 1 }}>
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
            <IconButton
              isFontIcon
              iconType="Ionicons"
              iconName="close"
              iconWidth="24"
              iconColor={COLOR.BASIC_BLACK}
              hitSlop={20}
              onPress={() => setOpenUrl('')}
            />
          </View>
          <WebView source={{ uri: openUrl }} />
        </View>
      ) : (
        <>
          {/* 백그라운드 */}
          <View
            style={{
              backgroundColor: '#00000099',
              flex: 1,
              paddingTop: 265,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: COLOR.WHITE,
                borderTopStartRadius: 14,
                borderTopEndRadius: 14,
                paddingTop: 33,
                paddingHorizontal: 16,
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
                    <CheckIcon name="check" size={18} color={COLOR.WHITE} />
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
                          <CheckIcon name="check" size={18} color={COLOR.WHITE} />
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
                    <IconButton
                      isFontIcon
                      iconType="FontAwesome"
                      iconName="angle-right"
                      iconWidth="18"
                      iconColor={COLOR.GRAY_E3}
                      hitSlop={20}
                      onPress={() => webViewHandler(text)}
                    />
                  </Pressable>
                ))}
              </View>

              <TextButton
                value="완료"
                textSize="17px"
                textWeight="SemiBold"
                textColor={COLOR.WHITE}
                style={{
                  backgroundColor: isCheckAll ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
                  borderRadius: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 48,
                  marginBottom: 24,
                }}
                onPress={setStep}
                disabled={!isCheckAll}
              />
            </View>
          </View>
        </>
      )}
    </Modal>
  );
};

export default SubscribeTermsModal;
