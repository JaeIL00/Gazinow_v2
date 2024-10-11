import React from 'react';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import { IssueContent } from '@/global/apis/entity';
import { LaneCapsulesPerIssue } from '.';
import { View } from 'react-native';
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
      <TouchableOpacity
        className="px-16 pb-16"
        onPress={() => {
          dispatch(getIssueId(issue.id));
          navigation.navigate('IssueStack', { screen: 'IssueDetail' });
        }}
      >
        <LaneCapsulesPerIssue lanes={issue.lines} />
        <FontText value={issue.title} textSize="16px" textWeight="SemiBold" numberOfLines={2} />
        <View className="h-4" />
        <FontText
          value={dayjs(issue.startDate).fromNow()}
          textSize="14px"
          textWeight="Regular"
          textColor={COLOR.GRAY_999}
        />
        <View className="h-4" />
        <FontText
          value={issue.content}
          textSize="14px"
          textWeight="Regular"
          textColor="#6A6A6A"
          numberOfLines={2}
        />
      </TouchableOpacity>
      {isLastItem ? (
        isHeader && <View className="w-999 h-8 my-12 bg-gray-8f8" />
      ) : (
        <View className="h-1 w-999 bg-gray-8f8" />
      )}
    </>
  );
};

export default IssueContainer;
