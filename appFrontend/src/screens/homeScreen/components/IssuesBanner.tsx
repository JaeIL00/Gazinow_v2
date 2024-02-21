import React, { useState } from 'react';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { IssueSummary } from '@/global/apis/entity';
import MoreBtn from '@/assets/icons/moreBtn.svg';
import Demonstration from '@/assets/icons/issue_demonstration.svg';
import { IssueModalTest } from '@/screens/nowScreen/components';
import { subwayLineColor } from '@/global/utils';

interface IssuesBannerProps {
  issueSummary: IssueSummary;
}

const IssuesBanner = ({ issueSummary }: IssuesBannerProps) => {
  const [isIssueDetailOpened, setIsIssueDetailOpened] = useState<boolean>(false);
  const issueIconColor = () => {
    return subwayLineColor(1);
    // return subwayLineColor(issueSummary.stationCode);
    // TODO: 서버에서 stationCode 뱉어주면 수정
  };

  return (
    <>
      {isIssueDetailOpened && (
        <IssueModalTest id={issueSummary.id} onRequestClose={() => setIsIssueDetailOpened(false)} />
      )}
      <Container
        onPress={() => {
          setIsIssueDetailOpened(true);
        }}
      >
        <Issue>
          {/* TODO: 이슈에 따라 아이콘 바꾸기 */}
          <Demonstration width={16} fill={issueIconColor()} />
          <Space width="10px" />
          <FontText
            // value={issueSummary.title}
            value='test'
            textSize="13px"
            textWeight="SemiBold"
            lineHeight="19px"
            textColor={COLOR.BASIC_BLACK}
          />
        </Issue>
        <MoreBtn />
      </Container>
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
`;
const Issue = styled.View`
  align-items: center;
  flex-direction: row;
`;
