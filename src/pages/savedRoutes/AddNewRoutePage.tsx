import React from 'react';
import styled from '@emotion/native';
import { COLOR } from '@/constants';
import { SwapSubwayStation } from '@/global/components';

const AddNewRoutePage = () => {
  return (
    <SwapSubwayBox>
      <SwapSubwayWrap>
        <SwapSubwayStation isWrap={false} showHeader={true} />
      </SwapSubwayWrap>
    </SwapSubwayBox>
  );
};

const SwapSubwayWrap = styled.View`
  flex: 1;
`;
const SwapSubwayBox = styled.View`
  background-color: ${COLOR.WHITE};
  flex-direction: row;
  padding: 30px 16px 21px 22px;
  margin-bottom: 17px;
  flex: 1;
`;

export default AddNewRoutePage;
