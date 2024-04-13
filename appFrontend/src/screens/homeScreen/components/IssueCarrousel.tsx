import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useGetPopularIssuesQuery } from '@/global/apis/hooks';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';
import { COLOR } from '@/global/constants';
import { FontText } from '@/global/ui';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import dayjs from 'dayjs';
import { rawLineNameToColor } from '@/global/utils/subwayLine';

const IssueCarrousel = () => {
  const navigation = useRootNavigation();
  const dispatch = useAppDispatch();
  const { popularIssues } = useGetPopularIssuesQuery();
  const [itemWidth, setItemWidth] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    if (!popularIssues || popularIssues.length === 0) return;

    const interval = setInterval(() => {
      if (currentIndex === popularIssues.length - 1) {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
        setCurrentIndex(0);
      } else {
        scrollViewRef.current?.scrollTo({ x: itemWidth * (currentIndex + 1), animated: true });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, itemWidth, popularIssues]);

  if (!popularIssues) return null;
  return (
    <View
      style={{ backgroundColor: COLOR.WHITE, borderRadius: 12, padding: 16, flexDirection: 'row' }}
    >
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: `${100 * popularIssues.length}%` }}
        onContentSizeChange={(width) => setItemWidth(width / popularIssues.length)}
      >
        <View style={{ flexDirection: 'row' }}>
          {popularIssues.map((issue, index: number) => (
            <View style={{ width: itemWidth }} key={index}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(getIssueId(issue.id));
                  navigation.navigate('IssueStack', { screen: 'IssueDetail' });
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginRight: 14 }}>
                    <IssueKeywordIcon
                      width={30}
                      height={30}
                      keyword={issue.keyword}
                      color={rawLineNameToColor(issue.lines[0])} //FIXME: 여러 호선에 걸친 이슈인 경우?
                    />
                  </View>

                  <View style={{ flex: 1 }}>
                    <FontText
                      value={issue.title}
                      textSize="13px"
                      lineHeight="19px"
                      textWeight="SemiBold"
                      textColor={COLOR.BASIC_BLACK}
                      numberOfLines={1}
                    />
                    <FontText
                      value={dayjs(issue.startDate).fromNow()}
                      textSize="11px"
                      lineHeight="13px"
                      textWeight="Medium"
                      textColor={COLOR.GRAY_999}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{ alignItems: 'flex-end', marginLeft: 16 }}>
        <FontText
          value="NOW"
          textSize="12px"
          lineHeight="14px"
          textWeight="Bold"
          textColor="#346BF7"
        />
        <View
          style={{
            backgroundColor: '#F3F3F3',
            borderRadius: 27,
            width: 36,
            height: 16,
            marginTop: 4,
            justifyContent: 'center',
          }}
        >
          <FontText
            value={`${currentIndex + 1}/${popularIssues.length}`}
            textSize="11px"
            lineHeight="13px"
            textWeight="Medium"
            textColor="#B4B4B4"
            textAlign="center"
          />
        </View>
      </View>
    </View>
  );
};

export default IssueCarrousel;
