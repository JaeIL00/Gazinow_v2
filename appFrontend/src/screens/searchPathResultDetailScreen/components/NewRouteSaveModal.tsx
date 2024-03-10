import { FontText, Input, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { KeyboardAvoidingView, Modal, Platform, View } from 'react-native';
import { useState } from 'react';
import { SubwaySimplePath } from '@/global/components';
import { useSavedSubwayRoute } from '@/global/apis/hooks';
import { Path } from '@/global/apis/entity';
import { useQueryClient } from 'react-query';

interface NewRouteSaveModalProps {
  freshData: Path;
  closeModal: () => void;
  onBookmark: () => void;
}
const NewRouteSaveModal = ({ freshData, closeModal, onBookmark }: NewRouteSaveModalProps) => {
  const queryClient = useQueryClient();

  const [isDuplicatedError, setIsDuplicatedError] = useState<boolean>(false);
  const [routeName, setRouteName] = useState<string>('');

  const { mutate } = useSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries(['getRoads']);
      onBookmark();
      closeModal();
    },
    onError: ({ response }) => {
      if (response?.status === 409) {
        setIsDuplicatedError(true);
      }
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
                  if (text.length <= 10) {
                    setIsDuplicatedError(false);
                    setRouteName(text);
                  }
                }}
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 16,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <FontText
                value="이미 존재하는 이름입니다"
                textSize="12px"
                textWeight="Medium"
                textColor={isDuplicatedError ? COLOR.LIGHT_RED : 'transparent'}
              />
              <FontText
                value={routeName.length + '/10'}
                textSize="12px"
                textWeight="Medium"
                textColor={COLOR.GRAY_BE}
                // style={{ textAlign: 'right' }}
              />
            </View>
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
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default NewRouteSaveModal;
