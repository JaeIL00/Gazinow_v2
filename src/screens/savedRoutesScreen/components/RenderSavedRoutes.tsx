import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FontText, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import SubwayRoute from '@/screens/selectNewRouteScreen/components/SubwayRoute';
import { useDeleteSavedSubwayRoute, useGetSavedRoutesQuery } from '@/global/apis/hook';
import MyTabModal from '@/global/components/MyTabModal';
import { useQueryClient } from 'react-query';

interface RenderSavedRoutesProps {
  id: number;
  roadName: string;
}

const RenderSavedRoutes = () => {
  const [popupVisible, setPopupVisible] = useState<boolean>(false);
  const [routeToDelete, setRouteToDelete] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { deleteMutate } = useDeleteSavedSubwayRoute({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });

  const { data: savedRoutesData } = useGetSavedRoutesQuery();

  const renderSavedRoutes = () =>
    savedRoutesData?.map(({ id, roadName }: RenderSavedRoutesProps) => (
      <View key={id} style={styles.containerRoutes}>
        <View style={styles.containerRenderTitle}>
          <FontText
            value={roadName}
            textSize="18px"
            textWeight="SemiBold"
            lineHeight="23px"
            textColor={COLOR.BASIC_BLACK}
          />
          <TextButton
            value="삭제"
            textSize="13px"
            textColor={COLOR.GRAY_999}
            textWeight="Medium"
            onPress={() => showDeletePopup(id)}
            lineHeight="19px"
          />
        </View>

        <View style={styles.containerSubwayRoute}>
          <SubwayRoute />
        </View>

        <View style={styles.borderLine}></View>
      </View>
    ));

  const showDeletePopup = (id: number) => {
    setRouteToDelete(id);
    setPopupVisible(true);
  };

  const hideModal = () => setPopupVisible(false);

  const handleConfirm = async () => {
    deleteMutate({ id: routeToDelete });
    hideModal();
  };

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

const styles = StyleSheet.create({
  containerRoutes: {
    paddingBottom: 20,
  },
  containerRenderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerSubwayRoute: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: COLOR.GRAY_F9,
    width: 999,
    marginStart: -99,
    marginTop: 30,
  },
});

export default RenderSavedRoutes;
