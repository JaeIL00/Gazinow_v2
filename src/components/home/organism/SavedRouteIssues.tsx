import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from '@/components/common/molecules';
import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { RenderSavedRoutes, SubwayRoute } from '@/components/savedRoutes';
import { RecommendedRoutes, IssuesBanner, RoutingBox } from '@/components/home/organism';

const SavedRouteIssues = () => {
  const [activeButton, setActiveButton] = useState<'저장경로' | '이슈' | '최근검색'>('저장경로');

  const handleButtonClick = (buttonText: string) => setActiveButton(buttonText);

  const handleTextClick = () => {
    // navigation.
  }

  const renderButton = (text: string) => (
    <TouchableOpacity
      key={text}
      onPress={() => handleButtonClick(text)}
      style={[styles.navButton, { backgroundColor: activeButton === text ? '#474747' : 'white' }]}
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

  return (
    <View style={styles.container}>
      {/* 이슈/저장경로/최근검색 버튼 */}
      <View style={styles.navContainer}>
        <View style={styles.textContainer}>{['저장경로', '최근검색', '이슈'].map(renderButton)}</View>
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
      <RoutingBox />
    </View>
  );
};

const styles = StyleSheet.create({
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
  navButton: {
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
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default SavedRouteIssues;
