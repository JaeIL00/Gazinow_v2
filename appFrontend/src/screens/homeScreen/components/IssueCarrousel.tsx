import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { useGetAllIssuesQuery, useGetPopularIssuesQuery } from '@/global/apis/hooks';
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
  const { popularIssues, popularIssuesRefetch, isPopularIssuesLoading } =
    useGetPopularIssuesQuery();
  const { allIssues } = useGetAllIssuesQuery();
  const [itemWidth, setItemWidth] = useState<number>(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  //TODO: 현재 유효한 이슈 배열
  // const currentDate = new Date();
  // const currentIssues = Array.from(
  //   new Set(
  //     allIssues?.pages[0].content.filter((issue) => new Date(issue.expireDate) >= currentDate),
  //   ),
  // ).slice(0, 3);

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

  if (!popularIssues || popularIssues.length < 1) return null;
  return (
    <View className="mx-[-16px] flex-row bg-white rounded-13">
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        scrollEventThrottle={200}
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: `${100 * popularIssues.length}%` }}
        onContentSizeChange={(width) => setItemWidth(width / popularIssues.length)}
      >
        <View className="flex-row">
          {popularIssues.map((issue, index: number) => (
            <View
              className="rounded-12 border-16 border-b-0 border-gray-f9 p-16"
              style={{ width: itemWidth }}
              key={index}
            >
              <TouchableOpacity
                className="flex-row"
                onPress={() => {
                  dispatch(getIssueId(issue.id));
                  navigation.navigate('IssueStack', { screen: 'IssueDetail' });
                }}
              >
                <IssueKeywordIcon
                  width={30}
                  height={30}
                  keyword={issue.keyword}
                  color={rawLineNameToColor(issue.lines[0])}
                />
                <View style={{ flex: 1, marginHorizontal: 14 }}>
                  <FontText
                    value={issue.title}
                    textSize="13px"
                    lineHeight={19}
                    textWeight="SemiBold"
                    textColor={COLOR.BASIC_BLACK}
                    numberOfLines={1}
                  />
                  <FontText
                    value={dayjs(issue.startDate).fromNow()}
                    textSize="11px"
                    lineHeight={13}
                    textWeight="Medium"
                    textColor={COLOR.GRAY_999}
                  />
                </View>

                <View style={{ alignItems: 'flex-end' }}>
                  <FontText
                    value="NOW"
                    textSize="12px"
                    lineHeight={14}
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
                      value={`${index + 1}/${popularIssues.length}`}
                      textSize="11px"
                      lineHeight={13}
                      textWeight="Medium"
                      textColor="#B4B4B4"
                      textAlign="center"
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default IssueCarrousel;
