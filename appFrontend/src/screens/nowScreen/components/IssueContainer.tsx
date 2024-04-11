import React from 'react';
import styled from '@emotion/native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import LaneCapsulesPerIssue from './LaneCapsulesPerIssue';
import { RawSubwayLineName } from '@/global/apis/entity';

interface IssueDetailProps {
  id: number;
  title: string;
  time: string;
  body: string;
  isLastItem: boolean;
  isHeader: boolean;
  lanes: RawSubwayLineName[];
}

const IssueContainer = ({
  id,
  title,
  time,
  body,
  isLastItem,
  isHeader,
  lanes,
}: IssueDetailProps) => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();

  return (
    <>
      <LaneCapsulesPerIssue lanes={lanes} />
      <IssueList
        onPress={() => {
          dispatch(getIssueId(id));
          navigation.navigate('IssueStack', { screen: 'IssueDetail' });
        }}
      >
        <TextContainer>
          <FontText
            value={title}
            textSize="16px"
            textWeight="SemiBold"
            lineHeight="21px"
            numberOfLines={2}
          />
          <Space height="2px" />
          <FontText
            value={dayjs(time).fromNow()}
            textSize="11px"
            textWeight="Medium"
            lineHeight="13px"
          />
          <Space height="6px" />
          <FontText
            value={body}
            textSize="12px"
            textWeight="Regular"
            lineHeight="15px"
            numberOfLines={2}
          />
        </TextContainer>
        <Space width="12px" />
      </IssueList>
      {!isLastItem && <Space height="1px" width="999px" backgroundColor={COLOR.GRAY_F8} />}
      {isHeader && isLastItem && (
        <>
          <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />
          <Space height="8px" width="999px" backgroundColor={COLOR.GRAY_F8} />
          <Space height="12px" width="999px" backgroundColor={COLOR.WHITE} />
        </>
      )}
    </>
  );
};

const IssueList = styled.Pressable`
  padding: 0 16px 16px;
  flex-direction: row;
`;
const TextContainer = styled.View`
  flex: 3.3;
`;
export default IssueContainer;
