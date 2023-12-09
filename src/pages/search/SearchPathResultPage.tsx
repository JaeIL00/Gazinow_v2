import styled, { css } from '@emotion/native';
import { View } from 'react-native';

import { FontText, Space } from '@/components/common/atoms';
import { IconButton } from '@/components/common/molecules';
import { SwapSubwayStation } from '@/components/home/organism';
import { COLOR } from '@/constants';

const dummy = [
  { time: '45분 이상', departureName: '신용산역', departureLine: '4', arrivalLine: '2' },
];

const SearchPathResultPage = () => {
  return (
    <Container>
      <SwapSubwayBox>
        <LeftIconBox>
          <IconButton
            isFontIcon={false}
            imagePath="left_arrow_nonbar"
            iconWidth="9px"
            iconHeight="16px"
            onPress={() => {}}
          />
        </LeftIconBox>
        <SwapSubwayWrap>
          <SwapSubwayStation isWrap={false} />
        </SwapSubwayWrap>
      </SwapSubwayBox>

      <View style={{ backgroundColor: COLOR.WHITE }}>
        {dummy.map((item) => (
          <PathInner>
            <View>
              <PathTitleInfoBox>
                <FontText
                  value="소요시간"
                  textSize="11px"
                  textWeight="SemiBold"
                  lineHeight="13px"
                  textColor="#999"
                />
                <DetailButton>
                  <FontText
                    value="세부정보"
                    textSize="13px"
                    textWeight="Regular"
                    lineHeight="19px"
                    textColor="#999"
                  />
                  <Space width="4px" />
                  <IconButton
                    isFontIcon={false}
                    imagePath="right_arrow_nonbar"
                    iconWidth="4.5px"
                    iconHeight="8px"
                    onPress={() => {}}
                  />
                </DetailButton>
              </PathTitleInfoBox>
              <Space height="4px" />
              <FontText
                value={item.time}
                textSize="20px"
                textWeight="SemiBold"
                lineHeight="25px"
                textColor={COLOR.BASIC_BLACK}
              />
            </View>

            {/* 경로 그래프 */}
            <View
              style={css(
                `flexDirection: row; backgroundColor: orange;
                `,
              )}
            ></View>
          </PathInner>
        ))}
      </View>
    </Container>
  );
};

export default SearchPathResultPage;

const Container = styled.View`
  flex: 1;
`;
const SwapSubwayBox = styled.View`
  background-color: ${COLOR.WHITE};
  flex-direction: row;
  padding: 30px 16px 21px 22px;
  margin-bottom: 17px;
`;
const LeftIconBox = styled.View`
  margin-top: 13px;
  margin-right: 16px;
`;
const SwapSubwayWrap = styled.View`
  flex: 1;
`;
const DetailButton = styled.Pressable`
  flex-direction: row;
  align-items: center;
`;
const PathTitleInfoBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const PathInner = styled.View`
  padding: 20px 16px 24px;
`;
