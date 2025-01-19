import React, { useMemo } from 'react';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import { IssueContent, RawSubwayLineName } from '@/global/apis/entity';
import { Pressable, View } from 'react-native';
import cn from 'classname';
import { rawLineNameToNowCapsuleText } from '@/global/utils/subwayLine';
import IconHeart from '@/assets/icons/icon-heart-mono.svg';
import IconComment from '@/assets/icons/icon-chat-bubble-mono.svg';

interface SingleIssueContainerProps {
  issue: IssueContent;
}

const SingleIssueContainer = ({ issue }: SingleIssueContainerProps) => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();

  const { id, title, content, startDate, expireDate, likeCount, lines } = issue;

  const isExpired = dayjs().isAfter(dayjs(expireDate));

  const relatedSubwayLines = useMemo(() => {
  const sortedLines = Array.from(new Set(lines)).sort();
    return sortedLines
      .map((line, index) =>
        index > 0 ? `･${rawLineNameToNowCapsuleText(line)}` : rawLineNameToNowCapsuleText(line),
    )
    .join('');
  }, [lines]);


  return (
    <Pressable
      style={({ pressed }) => ({
        backgroundColor: pressed ? COLOR.GRAY_E5 : 'transparent',
        paddingHorizontal: 16,
        paddingVertical: 20,
        flexDirection: 'row',
        columnGap: 12,
      })}
      onPress={() => {
        dispatch(getIssueId(id));
        navigation.navigate('IssueStack', { screen: 'IssueDetail' });
      }}
    >
      <View
        className={cn('bg-[#EB514733] rounded-6 justify-center h-32 w-32', {
          'bg-gray-beb': isExpired,
        })}
      >
        <FontText
          text={isExpired ? '종료' : '진행'}
          className={cn('text-12 leading-14 text-light-red text-center', {
            'text-gray-999': isExpired,
          })}
          fontWeight="500"
        />
      </View>

      <View className="flex-1 space-y-6">
        <View className="flex-row space-x-8">
          <FontText text="영향권" className="text-[#58606A] text-13 leading-19" fontWeight="600" />
          <FontText
            text={relatedSubwayLines}
            className="flex-1 text-gray-999 text-13 leading-19"
            numberOfLines={1}
          />
        </View>

        <FontText text={title} fontWeight="500" numberOfLines={2} />

        <FontText text={content} className="text-14 text-[#6A6A6A]" numberOfLines={2} />

        <View className="flex-row items-center space-x-8">
          <View className="flex-row items-center w-48 space-x-4">
            <IconHeart color="#D1D6DB" width={18} height={18} />
            <FontText text={'' + likeCount} className="text-13 leading-19 text-gray-999" />
          </View>
          <View className="flex-row items-center w-48 space-x-4">
            <IconComment width={18} height={18} />
            {/* TODO: api 수정되면 댓글 개수 반영하기 */}
            <FontText text={'' + likeCount} className="text-13 leading-19 text-gray-999" />
          </View>
          <View className="w-1 h-10 bg-[#D9D9D9]" />
          <FontText
            text={dayjs(startDate).fromNow()}
            className="text-gray-999 text-13 leading-19"
          />
        </View>
      </View>
    </Pressable>
  );
};

export default SingleIssueContainer;
