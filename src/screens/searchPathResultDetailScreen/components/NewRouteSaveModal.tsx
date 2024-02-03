import { FontText, Input, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { Modal, View } from 'react-native';
import { useState } from 'react';
import { SubwaySimplePath } from '@/global/components';
import { useSavedSubwayRoute } from '@/global/apis/hook';
import { Path } from '@/global/apis/entity';

interface NewRouteSaveModalProps {
  freshData: Path;
  closeModal: () => void;
  onBookmark: () => void;
}
const NewRouteSaveModal = ({ freshData, closeModal, onBookmark }: NewRouteSaveModalProps) => {
  const [routeName, setRouteName] = useState<string>('');

  const { mutate } = useSavedSubwayRoute({
    onSuccess: () => {
      onBookmark();
      closeModal();
      // 인벨리드쿼리 하고
      // 일시적으로 수동적으로 북마크 켜주기
      // 백엔드: 인벨리드 됐기때문에 나갔다오면 켜져있음
    },
  });

  const saveHandler = () => {
    if (routeName.length === 0) return;
    mutate({
      roadName: routeName,
      ...freshData,
    });
  };

  return (
    <Modal visible onRequestClose={closeModal} transparent>
      <View
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.60)',
          flex: 1,
          position: 'relative',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 296,
        }}
      >
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            paddingVertical: 28,
            paddingHorizontal: 24,
            borderRadius: 12,
            alignItems: 'center',
            maxWidth: 296,
            width: '100%',
          }}
        >
          <FontText
            value="새 경로 저장"
            textSize="18px"
            textWeight="SemiBold"
            textColor={COLOR.BASIC_BLACK}
          />

          <View style={{ width: '100%', marginVertical: 4 }}>
            <SubwaySimplePath
              pathData={freshData.subPaths}
              arriveStationName={freshData.lastEndStation}
              betweenPathMargin={16}
            />
          </View>

          <View style={{ width: '100%' }}>
            <FontText
              value="새 경로 이름"
              textSize="14px"
              textWeight="Medium"
              textColor={COLOR.BASIC_BLACK}
            />
            <View
              style={{
                borderRadius: 5,
                backgroundColor: COLOR.GRAY_F9,
                width: '100%',
                paddingLeft: 15,
                paddingTop: 12.31,
                paddingBottom: 10.69,
                marginTop: 5.48,
                marginBottom: 8.31,
              }}
            >
              <Input
                value={routeName}
                onChangeText={(text) => {
                  if (text.length <= 10) setRouteName(text);
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              />
            </View>
            <FontText
              value={routeName.length + '/10'}
              textSize="12px"
              textWeight="Medium"
              textColor={COLOR.GRAY_BE}
              style={{ textAlign: 'right' }}
            />
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <TextButton
              value="취소"
              textSize="14px"
              textWeight="SemiBold"
              style={{
                paddingVertical: 12,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: COLOR.GRAY_999,
                flex: 1,
                alignItems: 'center',
              }}
              onPress={closeModal}
            />
            <Space width="8px" />
            <TextButton
              value="확인"
              textSize="14px"
              textWeight="SemiBold"
              textColor={COLOR.WHITE}
              style={{
                paddingVertical: 12,
                borderRadius: 5,
                backgroundColor: routeName.length > 0 ? COLOR.BASIC_BLACK : COLOR.GRAY_DDD,
                flex: 1,
                alignItems: 'center',
              }}
              onPress={saveHandler}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewRouteSaveModal;
