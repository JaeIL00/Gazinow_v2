import React from 'react';
import styled from '@emotion/native';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { FreshSubwayLineName, NowScreenCapsules, SubPath } from '@/global/apis/entity';
import { ScrollView, View } from 'react-native';
import { allLines, pathSubwayLineNameInLine } from '@/global/utils/subwayLine';
import { useAppSelect } from '@/store';

interface LaneButtonsProps {
  activeButton: NowScreenCapsules;
  setActiveButton: (activeButton: NowScreenCapsules) => void;
  titleNotShown: boolean;
}

//TODO: + 버튼 구현
const LaneButtons = ({ activeButton, setActiveButton, titleNotShown }: LaneButtonsProps) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  // 내가 저장한 경로의 노선만 가져옴
  const { data: savedRoutes } = useGetSavedRoutesQuery();

  let savedStations: string[] | undefined;

  // isVerifiedUser 상태에 따라 표시할 노선 캡슐 변경
  if (isVerifiedUser === 'success auth') {
    savedStations = savedRoutes?.reduce((acc, current) => {
      const { subPaths } = current;
      const lineOfSubPath = subPaths.map((sub: SubPath) => {
        return pathSubwayLineNameInLine(sub.lanes[0].stationCode);
      });
      return Array.from(new Set([...acc, ...lineOfSubPath])).sort();
    }, [] as string[]);
  } else {
    savedStations = [];
  }

  // savedStations에 없는 나머지 노선
  const otherStations: FreshSubwayLineName[] = allLines.filter(
    (line) => !savedStations?.includes(line),
  );

  return (
    <View style={{ backgroundColor: COLOR.WHITE }}>
      {!titleNotShown ? (
        <IssueLineType>
          <FontText
            value={activeButton === '전체' ? '전체' : `${activeButton} NOW`}
            textSize="20px"
            textWeight="SemiBold"
            lineHeight={25}
          />
        </IssueLineType>
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ flexDirection: 'row', paddingVertical: 12 }}
        >
          <Space width="16px" />
          {savedStations &&
            ['전체', ...savedStations, ...otherStations].map((text) => (
              <ButtonStyle
                key={text}
                onPress={() => setActiveButton(text as NowScreenCapsules)}
                activeButton={activeButton === text}
              >
                <FontText
                  value={text}
                  textSize="14px"
                  textWeight="Medium"
                  textColor={activeButton === text ? 'white' : '#969696'}
                />
              </ButtonStyle>
            ))}
          <Space width="16px" />
        </ScrollView>
      )}
    </View>
  );
};

const ButtonStyle = styled.TouchableOpacity<{ activeButton: boolean }>`
  border-width: 1px;
  border-color: ${({ activeButton }) => (activeButton ? 'transparent' : COLOR.GRAY_EB)};
  border-radius: 999px;
  padding: 8px 12px;
  margin-right: 6px;
  background-color: ${({ activeButton }) => (activeButton ? '#171717' : 'white')};
`;
const IssueLineType = styled.View`
  padding: 24px 16px 12px;
`;
export default LaneButtons;
