import React, { useState, useEffect, useRef } from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useGetAllIssuesQuery, useGetPopularIssuesQuery } from '@/global/apis/hooks';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';
import { FontText } from '@/global/ui';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import dayjs from 'dayjs';
import { rawLineNameToColor } from '@/global/utils/subwayLine';
import { IssueContent } from '@/global/apis/entity';
import { useQueryClient } from 'react-query';

interface IssueCarrouselProps {
  isRefreshing: boolean;
  setIsRefreshing: (isRefreshing: boolean) => void;
}

const IssueCarrousel = ({ isRefreshing, setIsRefreshing }: IssueCarrouselProps) => {
  const navigation = useRootNavigation();
  const queryClient = useQueryClient();
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
    //TODO: 현재이슈로 바꾸면 쿼리 키도 바꾸기
    queryClient.invalidateQueries(['getPopularIssues']);
    if (isRefreshing) {
      popularIssuesRefetch();
    }
    setIsRefreshing(false);
  }, [isRefreshing]);

  const [newPopularIssues, setNewPopularIssues] = useState<IssueContent[]>();

  useEffect(() => {
    if (!popularIssues || popularIssues.length === 0) return;

    const startData = popularIssues[0];
    const newList = [...popularIssues, startData];

    setNewPopularIssues(newList);
  }, [popularIssues]);

  const [autoScrollTime, setAutoscrollTime] = useState<number>(3000);

  useEffect(() => {
    if (!popularIssues || popularIssues.length === 0) return;

    const interval = setInterval(() => {
      if (currentIndex === popularIssues.length) {
        setAutoscrollTime(1);
        scrollViewRef.current?.scrollTo({ x: 0, animated: false });
        setCurrentIndex(0);
        setAutoscrollTime(3000);
      } else {
        scrollViewRef.current?.scrollTo({ x: itemWidth * (currentIndex + 1), animated: true });
        setCurrentIndex((prevIndex) => prevIndex + 1);
        setAutoscrollTime(3000);
      }
    }, autoScrollTime);

    return () => clearInterval(interval);
  }, [currentIndex, itemWidth, popularIssues]);

  const newListIndex = () => {
    if (popularIssues && currentIndex === popularIssues.length) return 1;
    return currentIndex + 1;
  };

  // 수동 스크롤 시 인덱스 변경
  const handleMomentumScrollEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / itemWidth);
    setCurrentIndex(index);
  };

  if (!popularIssues || !newPopularIssues || newPopularIssues.length < 1) return null;
  return (
    <ScrollView
      className="mx-[-16px] flex-row rounded-13"
      ref={scrollViewRef}
      horizontal
      pagingEnabled
      scrollEventThrottle={200}
      decelerationRate="normal"
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ width: `${100 * newPopularIssues.length}%` }}
      onContentSizeChange={(width) => setItemWidth(width / newPopularIssues.length)}
      onMomentumScrollEnd={handleMomentumScrollEnd} // Handle manual scroll end
    >
      {newPopularIssues.map((issue, index: number) => (
        <View style={{ width: itemWidth }} key={index}>
          <TouchableOpacity
            className="flex-row p-16 m-16 mb-0 bg-white rounded-12"
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
            <View className="flex-1 mx-14">
              <FontText
                text={issue.title}
                className="text-black text-13 leading-19"
                fontWeight="600"
                numberOfLines={1}
              />
              <FontText
                text={dayjs(issue.startDate).fromNow()}
                className="text-11 leading-13 text-gray-999"
                fontWeight="500"
              />
            </View>

            <View className="items-end">
              <FontText
                text="NOW"
                className="text-12 leading-14 text-light-blue"
                fontWeight="700"
              />
              <View className="bg-[#F3F3F3] rounded-27 w-36 h-16 mt-4 justify-center">
                <FontText
                  text={`${newListIndex()}/${popularIssues.length}`}
                  className="text-center text-11 leading-13 text-gray-4b4"
                  fontWeight="700"
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default IssueCarrousel;
