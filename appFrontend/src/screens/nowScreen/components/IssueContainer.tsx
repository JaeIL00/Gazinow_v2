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
          value={dayjs(issue.agoTime).fromNow()}
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
      {!isLastItem && <View className="h-1 w-999 bg-gray-f8" />}
      {isHeader && isLastItem && (
        <>
          <View className="h-12 bg-white w-999" />
          <View className="h-8 w-999 bg-gray-f8" />
          <View className="h-12 bg-white w-999" />
        </>
      )}
    </>
  );
};

export default IssueContainer;
