import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import styled from '@emotion/native';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';

const SavedRoutes = () => {
  const subwayRoutes = [
    { line: 'line4', station: '혜화', color: COLOR.LINE4 },
    { line: 'line2', station: '동대문역사문화공원', color: COLOR.LINE2 },
    { line: 'line2', station: '잠실', color: COLOR.LINE2 },
  ];

  const savedRoutes = [
    { savedrouteName: '출근' },
    { savedrouteName: '본가' },
    { savedrouteName: '퇴근' },
  ];

  const renderSavedRoutes = () => {
    return savedRoutes.map(({ savedrouteName }, index) => (
      <View key={index} style={styles.containerRoutes}>
        <View style={styles.containerRenderTitle}>
          <FontText
            value={savedrouteName}
            textSize="22px"
            textWeight="Bold"
            lineHeight="29px"
            textColor={COLOR.BASIC_BLACK}
          />
          <TouchableOpacity onPress={showDeletePopup}>
            <FontText
              value="삭제"
              textSize="16px"
              textWeight="Medium"
              lineHeight="21px"
              textColor={COLOR.GRAY_999}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.containerRenderRoute}>
          {renderSubwayRoute(subwayRoutes)}
        </View>

        <View style={styles.borderLine}></View>
      </View>
    ));
  };

  const renderSubwayRoute = (routes) => {
    return routes.map(({ line, station, color }, index) => (
      <View key={line + station} style={styles.containerStation}>
        <View style={styles.iconContainer}>
          <IconButton isFontIcon={false} imagePath={line} iconWidth="25px" iconHeight="25px" />
          {index < routes.length - 1 && <View style={styles.greenLine}></View>}
        </View>
        <FontText
          value={station}
          textSize="16px"
          textWeight="Medium"
          lineHeight="21px"
          textColor={color}
        />
      </View>
    ));
  };

  const [popupVisible, setPopupVisible] = useState(false);

  const showDeletePopup = () => {
    setPopupVisible(true);
  };

  const hideDeletePopup = () => {
    setPopupVisible(false);
  };

  const handleDelete = () => {
    // 삭제 로직 추가
    hideDeletePopup();
  };

  const DeleteModal = ({ isVisible, onCancel, onDelete }) => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancel}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popupContainer}>
            <FontText
              value="경로를 삭제하시겠습니까?"
              textSize="20px"
              textWeight="SemiBold"
              lineHeight="30px"
              textColor={COLOR.BASIC_BLACK}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
              >
                <FontText
                  value="취소"
                  textSize="16px"
                  textWeight="SemiBold"
                  lineHeight="30px"
                  textColor={COLOR.GRAY_999}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={onDelete}
              >
                <FontText
                  value="삭제"
                  textSize="16px"
                  textWeight="Bold"
                  lineHeight="30px"
                  textColor={COLOR.WHITE}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <Container>
      <View style={styles.header}>
        <IconButton isFontIcon={false} imagePath="backBtn" iconWidth="20px" iconHeight="30px" />
        <FontText
          value="  저장한 경로"
          textSize="22px"
          textWeight="Bold"
          lineHeight="29px"
          textColor={COLOR.BASIC_BLACK}
        />
      </View>

      <View style={styles.container}>
        {renderSavedRoutes()}
        <View style={styles.containerAdd}>
          <IconButton isFontIcon={false} imagePath="addRoute" iconWidth="20px" iconHeight="20px" />
          <FontText
            value="  추가하기"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
        </View>
      </View>

      <DeleteModal
        isVisible={popupVisible}
        onCancel={hideDeletePopup}
        onDelete={handleDelete}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: 0 16px;
  flexDirection: column;
`;

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greenLine: {
    width: 50,
    height: 2,
    backgroundColor: '#00B140',
  },
  container: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  containerRoutes: {
    paddingBottom: 20,
  },
  containerRenderTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerRenderRoute: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStation: {
    alignItems: 'center',
  },
  borderLine: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    width: 999,
    marginStart: -99,
    marginTop: 30,
  },
  containerAdd: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  stationName: {
    fontSize: 16,
    marginTop: 10,
    color: '#00B140',
  },
  textBold: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
  },
  textRegular: {
    fontSize: 16,
    marginRight: 5,
  },
  header: {
    marginVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  popupContainer: {
    width: 350,
    height: 160,
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    marginRight: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  deleteButton: {
    flex: 1,
    marginLeft: 5,
    backgroundColor: 'black',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },

});

export default SavedRoutes;
