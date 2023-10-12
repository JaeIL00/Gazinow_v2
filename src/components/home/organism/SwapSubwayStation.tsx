import styled from '@emotion/native';
import type { PressableProps } from 'react-native';

import IconButton from '../../common/molecules/IconButton';
import TextButton from '../../common/molecules/TextButton';
import { BG_LIGHT_GRAY } from '@/constants';

interface SwapSubwayStationProps extends PressableProps {}

const SwapSubwayStation = (props: SwapSubwayStationProps) => {
  const { onPress } = props;

  return (
    <Container>
      <InnerBox>
        <StationButton value="출발역" textSize="16px" onPress={onPress} />
        <StationButton value="도착역" textSize="16px" onPress={onPress} />
      </InnerBox>
      <IconButton iconName="exchange_gray" iconWidth="20px" iconHeight="20px" />
    </Container>
  );
};

export default SwapSubwayStation;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InnerBox = styled.View`
  flex: 1;
  margin-right: 15px;
  gap: 8px;
`;
const StationButton = styled(TextButton)`
  background-color: ${BG_LIGHT_GRAY};
  width: 100%;
  height: 41px;
  border-radius: 8px;
  justify-content: center;
  padding-left: 10px;
  padding-right: 15px;
`;
