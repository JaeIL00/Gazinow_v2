import React from 'react';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { IssueSummary, Lane, SubPath } from '@/global/apis/entity';
import MoreBtn from '@/assets/icons/moreBtn.svg';
import { subwayLineColor } from '@/global/utils';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';
import IssueKeywordIcon from '@/global/components/IssueKeywordIcon';

interface IssuesBannerProps {
  subPathss: SubPath[];
}

const IssuesBanner = ({ subPathss }: IssuesBannerProps) => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();

  const hasIssueLane = subPathss.reduce((accumulator: Lane[], subPaths: SubPath) => {
    if (subPaths.lanes[0].issueSummary.length > 0) {
      accumulator.push(subPaths.lanes[0]);
    }
    return accumulator;
  }, []);

  if (hasIssueLane.length < 1) return null;
  return (
    <>
      {hasIssueLane.map((lane: Lane, index: number) =>
        lane.issueSummary.map((issue: IssueSummary, issueIndex: number) => (
          <Container
            key={`${index}-${issueIndex}`}
            onPress={() => {
              dispatch(getIssueId(issue.id));
              navigation.navigate('IssueStack', { screen: 'IssueDetail' });
            }}
          >
            <Issue>
              <IssueKeywordIcon
                width={16}
                height={16}
                keyword={issue.keyword}
                color={subwayLineColor(lane.stationCode)}
              />
              <Space width="10px" />
              <FontText
                value={issue.title}
                textSize="13px"
                textWeight="SemiBold"
                textColor={COLOR.BASIC_BLACK}
                numberOfLines={1}
                style={{ marginBottom: 3 }}
              />
            </Issue>
            <More>
              <MoreBtn />
            </More>
          </Container>
        )),
      )}
    </>
  );
};
export default IssuesBanner;

const Container = styled.Pressable`
  padding: 8px 12.5px 7px 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-color: ${COLOR.GRAY_EB};
  border-width: 1px;
  border-radius: 999px;
  margin: 0 0 8px;
`;
const Issue = styled.View`
  align-items: center;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
  padding-right: 30px;
`;
const More = styled.View`
  align-items: center;
  flex-direction: row;
  // flex: 1;
`;
