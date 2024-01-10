import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const SavedRouteIssues = () => {
  const [activeButton, setActiveButton] = useState<'이슈' | '저장경로' | '최근검색'>('이슈');

  const subwayRoutes = [
    { line: 'line4', station: '혜화', color: COLOR.LINE4 },
    { line: 'line2', station: '동대문역사문화공원', color: COLOR.LINE2 },
    { line: 'line2', station: '잠실', color: COLOR.LINE2 },
  ];

  const handleButtonClick = (buttonText: string) => setActiveButton(buttonText);

  const handleTextClick = () => {
    // navigation.
  }

  const renderButton = (text: string) => (
    <TouchableOpacity
      key={text}
      onPress={() => handleButtonClick(text)}
      style={[styles.button, { backgroundColor: activeButton === text ? '#474747' : 'white' }]}
    >
      <FontText
        value={text}
        textSize="16px"
        textWeight="Medium"
        lineHeight="31px"
        textColor={activeButton === text ? 'white' : 'black'}
      />
    </TouchableOpacity>
  );

  const renderSubwayRoute = () => {
    return subwayRoutes.map(({ line, station, color }, index) => (
      <View key={line + station}>
        <View style={styles.iconContainer}>
          <IconButton isFontIcon={false} imagePath={line} iconWidth="25px" iconHeight="25px" />
          {index < subwayRoutes.length - 1 && <View style={styles.greenLine}></View>}
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

  return (
    <View style={styles.container}>
      {/* 이슈/저장경로/최근검색 버튼 */}
      <View style={styles.navContainer}>
        <View style={styles.textContainer}>{['이슈', '저장경로', '최근검색'].map(renderButton)}</View>
        <TouchableWithoutFeedback onPress={handleTextClick}>
          <FontText
            value="저장경로 편집"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
        </TouchableWithoutFeedback>
      </View>

      {/* 중앙선 */}
      <View style={styles.borderLine}></View>

      {/* 출근길/세부정보 */}
      <View style={styles.horizontalContainer}>
        <View style={styles.textContainer}>
          <FontText style={styles.textRightMargin}
            value="출근길"
            textSize="20px"
            textWeight="Bold"
            lineHeight="21px"
            textColor={COLOR.BASIC_BLACK}
          />
          <FontText style={styles.grayEllipse}
            value="42분 이상 예상"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
        </View>
        <View style={styles.textContainer}>
          <FontText style={styles.textRightMargin}
            value="세부정보"
            textSize="16px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={COLOR.GRAY_999}
          />
          <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
        </View>
      </View>

      {/* 지하철 경로, 이슈 아이콘 */}
      <View style={styles.container2}>{renderSubwayRoute()}</View>
      <View style={styles.issuesContainer}>
        <IconButton
          isFontIcon={false}
          imagePath="issue_rain_circle"
          iconWidth="30px"
          iconHeight="30px"
        />
        <FontText style={styles.buttonIssues}
          value="폭우로 인한 4호선 운행정지"
          textSize="18px"
          textWeight="Bold"
          lineHeight="21px"
          textColor={COLOR.BASIC_BLACK}
        />
        <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="12px" iconHeight="20px" />
      </View>

      {/* 대체경로 */}
      <View style={styles.grayRectg}>
        <View style={styles.horizontalContainer2}>
          <View style={styles.textContainer}>
            <FontText style={styles.textRightMargin}
              value="대체 경로"
              textSize="20px"
              textWeight="Bold"
              lineHeight="21px"
              textColor={COLOR.BASIC_BLACK}
            />
            <FontText
              value="평균 42분"
              textSize="14px"
              textWeight="Regular"
              lineHeight="15px"
              textColor={COLOR.BASIC_BLACK}
            />
          </View>
          <View style={styles.textContainer}>
            <FontText style={styles.textRightMargin}
              value="세부정보"
              textSize="16px"
              textWeight="Medium"
              lineHeight="21px"
              textColor={COLOR.GRAY_999}
            />
            <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="8px" iconHeight="14px" />
          </View>
        </View>

        <View style={styles.container2}>{renderSubwayRoute()}</View>
      </View>
    </View>
  );
};

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
    marginTop: 20,
    padding: 17,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  navContainer: {
    paddingBottom: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 40,
    paddingHorizontal: 10,
    marginRight: 6,
  },

  borderLine: {
    borderWidth: 1,
    borderColor: '#F2F2F2',
    width: 999,
    marginStart: -99,
  },

  horizontalContainer: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textRightMargin: {
    marginRight: 10,
  },

  grayEllipse: {
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  container2: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  issuesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    borderRadius: 40,
    marginTop: 25,
    marginBottom: 35,
    paddingHorizontal: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonIssues: {
    flex: 1,
    marginLeft: 10,
  },

  grayRectg: {
    fontSize: 16,
    backgroundColor: COLOR.BG_LIGHT_GRAY,
    borderRadius: 13,
    width: 'auto',
    height: 'auto',
    padding: 20,
  },
  horizontalContainer2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SavedRouteIssues;
