import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';

const SavedRouteIssues = () => {
  const [activeButton, setActiveButton] = useState('이슈');
  const subwayRoutes = [
    { line: '4', station: '혜화' },
    { line: '2', station: '동대문역사문화공원' },
    { line: '2', station: '잠실' },
  ];

  const handleButtonClick = (buttonText: string) => setActiveButton(buttonText);

  const renderButton = (text: string) => (
    <TouchableOpacity
      key={text}
      onPress={() => handleButtonClick(text)}
      style={[styles.button, { backgroundColor: activeButton === text ? '#474747' : 'white' }]}
    >
      <Text style={{ fontSize: 18, color: activeButton === text ? 'white' : 'black' }}>{text}</Text>
    </TouchableOpacity>
  );

  const renderSubwayRoute = () => {
    return subwayRoutes.map(({ line, station }, index, array) => (
      <View key={index} style={styles.iconContainer}>
        {/* {index < array.length - 1 && <View style={styles.line} />} */}
        <View style={styles.circle2}>
          <Text style={styles.iconText}>{line}</Text>
        </View>
        <Text style={styles.stationName}>{station}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {/* 이슈/저장경로/최근검색 버튼 */}
      <View style={styles.navContainer}>
        <View style={styles.textContainer}>
          {['이슈', '저장경로', '최근검색'].map(renderButton)}
        </View>
        <Text style={styles.textEditRoute}>저장경로 편집</Text>
      </View>

      {/* 중앙선 */}
      <View style={styles.borderLine}></View>

      {/* 출근길/세부정보 */}
      <View style={styles.horizontalContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textSavedRoute}>출근길</Text>
          <Text style={styles.grayEllipse}>42분 이상 예상</Text>
        </View>
        <View style={styles.rightContainer}>
          <Text style={styles.textMoreInfo}>세부정보</Text>
          <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="10px" iconHeight="20px" />
        </View>
      </View>

      {/* 지하철 경로, 이슈 아이콘 */}
      <View style={styles.container2}>{renderSubwayRoute()}</View>
      <View style={styles.issuesContainer}>
        <IconButton
          isFontIcon={false}
          imagePath="issue_rain_bottom"
          iconWidth="30px"
          iconHeight="30px"
        />
        <Text style={[styles.buttonIssues, styles.textIssues]}>폭우로 인한 4호선 운행정지</Text>
        <IconButton isFontIcon={false} imagePath="more_gray" iconWidth="10px" iconHeight="20px" />
      </View>

      {/* 대체경로 */}
      <View style={styles.grayRectg}>
        <View style={styles.horizontalContainer2}>
          <View style={styles.textContainer}>
            <Text style={styles.textSavedRoute}>대체 경로</Text>
            <Text style={styles.grayEllipse}>평균 42분</Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.textMoreInfo}>세부정보</Text>
            <IconButton
              isFontIcon={false}
              imagePath="more_gray"
              iconWidth="10px"
              iconHeight="20px"
            />
          </View>
        </View>

        <View style={styles.container2}>{renderSubwayRoute()}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  navContainer: {
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    paddingBottom: 20,
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
    paddingBottom: 7,
    paddingTop: 3,
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
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textEditRoute: {
    fontSize: 16,
  },
  textMoreInfo: {
    fontSize: 16,
    marginRight: 5,
  },
  textSavedRoute: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181818',
    marginRight: 10,
  },
  grayEllipse: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 40,
    paddingHorizontal: 8,
    paddingTop: 2,
    paddingBottom: 6,
    marginTop: 5,
  },

  container2: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  line4: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#0EB5EB',
  },
  line2: {
    flex: 1,
    borderBottomWidth: 2,
    borderColor: '#00B140',
  },
  iconContainer: {
    alignItems: 'center',
  },
  circle4: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#0EB5EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle2: {
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: '#00B140',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  stationName: {
    fontSize: 16,
    marginTop: 10,
    color: '#00B140',
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
  },
  textIssues: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181818',
    marginLeft: 10,
  },

  grayRectg: {
    fontSize: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 13,
    width: 'auto',
    height: 'auto',
    // marginTop: 15,
    padding: 20,
  },
  horizontalContainer2: {
    // marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default SavedRouteIssues;
