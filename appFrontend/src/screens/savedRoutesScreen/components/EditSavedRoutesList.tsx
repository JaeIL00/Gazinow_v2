import React, { useState } from 'react';
import { View } from 'react-native';
import { FontText, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useDeleteSavedSubwayRoute, useGetSavedRoutesQuery } from '@/global/apis/hooks';
import MyTabModal from '@/global/components/MyTabModal';
import { useQueryClient } from 'react-query';
import { SubwaySimplePath } from '@/global/components';
import { MyRoutesType } from '@/global/apis/entity';
import styled from '@emotion/native';
import { showToast } from '@/global/utils/toast';

const EditSavedRoutesList = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { deleteMutate } = useDeleteSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries('getRoads');
      showToast('deleteRoute');
    },
  });

  const { data: savedRoutes } = useGetSavedRoutesQuery();

  const showDeletePopup = (id: number) => {
    setRouteToDelete(id);
    setPopupVisible(true);
  };

  const hideModal = () => setPopupVisible(false);

  const handleConfirm = () => {
    deleteMutate({ id: routeToDelete });
    hideModal();
  };

  const renderSavedRoutes = () =>
    savedRoutes?.map((item: MyRoutesType) => (
      <View key={item.id}>
        <RouteContainer>
          <TitleContainer>
            <FontText
              value={item.roadName}
              textSize="18px"
              textWeight="SemiBold"
              lineHeight={23}
              textColor={COLOR.BASIC_BLACK}
            />
            <TextButton
              value="삭제"
              textSize="13px"
              textColor={COLOR.GRAY_999}
              textWeight="Regular"
              onPress={() => {
                if (!item.id) return;
                showDeletePopup(item.id);
              }}
              lineHeight={19}
            />
          </TitleContainer>
          <SubwaySimplePath
            pathData={item.subPaths}
            arriveStationName={item.lastEndStation}
            betweenPathMargin={24}
          />
          <Space height="8px" />
        </RouteContainer>
        <Space height="1px" backgroundColor={COLOR.GRAY_EB} />
      </View>
    ));

  return (
    <View>
      {renderSavedRoutes()}
      <MyTabModal
        isVisible={popupVisible}
        onCancel={hideModal}
        onConfirm={handleConfirm}
        title="경로를 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
      />
    </View>
  );
};

export default EditSavedRoutesList;

const RouteContainer = styled.View`
  padding: 20px 16px 0;
`;
const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;
