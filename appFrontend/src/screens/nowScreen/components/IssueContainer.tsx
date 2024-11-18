import React from 'react';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import { IssueContent } from '@/global/apis/entity';
import { LaneCapsulesPerIssue } from '.';
import { Pressable, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface IssueDetailProps {
  issue: IssueContent;
  isLastItem: boolean;
  isHeader?: boolean;
}

const IssueContainer = ({ issue, isLastItem, isHeader }: IssueDetailProps) => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();

  return (
    <>
      <Pressable
        style={({ pressed }) => ({
          backgroundColor: pressed ? COLOR.GRAY_E5 : 'transparent',
          paddingHorizontal: 16,
          paddingBottom: 16,
        })}
        onPress={() => {
          dispatch(getIssueId(issue.id));
          navigation.navigate('IssueStack', { screen: 'IssueDetail' });
        }}
      >
        <LaneCapsulesPerIssue lanes={issue.lines} />
        <FontText text={issue.title} fontWeight="600" numberOfLines={2} />
        <View className="h-4" />
        <FontText text={dayjs(issue.startDate).fromNow()} className="text-14 text-gray-999" />
        <View className="h-4" />
        <FontText text={issue.content} className="text-14 text-[#6A6A6A]" numberOfLines={2} />
      </Pressable>
      {isLastItem ? (
        isHeader && <View className="h-8 my-12 w-999 bg-gray-8f8" />
      ) : (
        <View className="h-1 w-999 bg-gray-8f8" />
      )}
    </>
  );
};

export default IssueContainer;
