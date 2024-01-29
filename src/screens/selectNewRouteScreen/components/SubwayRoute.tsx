import React from 'react';
import { View, StyleSheet } from 'react-native';
import { IconButton, FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';

const SubwayRoute = () => {
  const subwayRoutes = [
    { line: 'line4', station: '혜화', color: COLOR.LINE4, issue: 'issue_rain' },
    { line: 'line2', station: '동대문\n역사문화공원', color: COLOR.LINE2, issue: 'noIssue' },
    { line: 'line2', station: '잠실', color: COLOR.LINE2, issue: 'noIssue' },
  ];

  const renderSubwayRoute = (routes) => {
    return routes.map(({ line, station, color, issue }, index) => (
      <View key={index}>
        <View style={styles.stationContainer}>
          {/* <IconButton isFontIcon={false} imagePath={line} iconWidth="25px" iconHeight="25px" /> */}
          <FontText
            style={styles.stationName}
            value={station}
            textSize="15px"
            textWeight="Medium"
            lineHeight="21px"
            textColor={color}
          />
        </View>
        {index < routes.length - 1 && (
          <View
            key={`${index}-line`}
            style={[styles.transferLine, { backgroundColor: color }]}
          ></View>
        )}
      </View>
    ));
  };

  return renderSubwayRoute(subwayRoutes);
};

const styles = StyleSheet.create({
  stationName: {
    textAlign: 'center',
    top: 10,
  },
  stationContainer: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  transferLine: {
    // width: 100,
    // flex: 1,
    height: 2,
    // position: 'absolute',
    left: 68,
    bottom: 55,
  },
  // issueContainer: {
  //     left: 10,
  // },
});

export default SubwayRoute;
