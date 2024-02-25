import React from 'react';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { IssueSummary, Lane, SubPath } from '@/global/apis/entity';
import MoreBtn from '@/assets/icons/moreBtn.svg';
import Accident from '@/assets/icons/issue_accident.svg';
import Construction from '@/assets/icons/issue_construction.svg';
import Crowded from '@/assets/icons/issue_crowded.svg';
import Delayed from '@/assets/icons/issue_delayed.svg';
import Demonstration from '@/assets/icons/issue_demonstration.svg';
import Event from '@/assets/icons/issue_event.svg';
import NaturalDisasters from '@/assets/icons/issue_naturaldisasters.svg';
import { subwayLineColor } from '@/global/utils';
import { useAppDispatch } from '@/store';
import { getIssueId } from '@/store/modules';
import { useRootNavigation } from '@/navigation/RootNavigation';

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
              {
                {
                  자연재해: (
                    <NaturalDisasters width={16} fill={subwayLineColor(lane.stationCode)} />
                  ),
                  연착: (
                    <Delayed
                      width={16}
                      fill={subwayLineColor(lane.stationCode)}
                      stroke={subwayLineColor(lane.stationCode)}
                    />
                  ),
                  혼잡: <Crowded width={16} fill={subwayLineColor(lane.stationCode)} />,
                  행사: <Event width={16} fill={subwayLineColor(lane.stationCode)} />,
                  사고: <Accident width={16} fill={subwayLineColor(lane.stationCode)} />,
                  공사: <Construction width={16} fill={subwayLineColor(lane.stationCode)} />,
                  시위: <Demonstration width={16} fill={subwayLineColor(lane.stationCode)} />,
                }[issue.keyword]
              }
              <Space width="10px" />
              <More>
                <FontText
                  value={issue.title}
                  textSize="13px"
                  textWeight="SemiBold"
                  lineHeight="19px"
                  textColor={COLOR.BASIC_BLACK}
                  numberOfLines={1}
                  ellipsizeMode="middle"
                />
              </More>
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
  padding: 3px 12.5px 3px 16px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  border-color: ${COLOR.GRAY_EB};
  border-width: 1px;
  border-radius: 999px;
  margin: 0 0 8px;
`;
const Issue = styled.View`
  flex-direction: row;
`;
const More = styled.View`
  align-items: center;
  flex-direction: row;
  // flex: 1;
`;
