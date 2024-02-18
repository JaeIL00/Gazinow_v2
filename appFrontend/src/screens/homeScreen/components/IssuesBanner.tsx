import React from 'react';
import { IconButton, FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import styled from '@emotion/native';
import { RenderSavedRoutesType } from '@/global/apis/entity';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import IconWalkHuman from '@assets/icons/walk_human.svg';
import { TouchableOpacity } from 'react-native';
interface IssuesBannerProps {
  pathData: RenderSavedRoutesType;
}

const IssuesBanner = ({ pathData }: IssuesBannerProps) => {
  const IssueDetail = () => {
    console.log('dddd');
    //TODO: 이슈 상세 페이지로 이동
  };

  return (
    <Container onPress={IssueDetail}>
      <Issue>
        {/* TODO: 이슈에 따라 아이콘, 타이틀 바꾸기 */}
        <TouchableOpacity onPress={IssueDetail}>
          <IconWalkHuman width={15} height={15} />
        </TouchableOpacity>
        <Space width="10px" />
        <FontText
          value={pathData.lastEndStation}
          textSize="13px"
          textWeight="SemiBold"
          lineHeight="19px"
          textColor={COLOR.BASIC_BLACK}
        />
      </Issue>
      <IconRightArrowHead onPress={IssueDetail} />
    </Container>
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
`;
const Issue = styled.View`
  align-items: center;
  flex-direction: row;
`;
