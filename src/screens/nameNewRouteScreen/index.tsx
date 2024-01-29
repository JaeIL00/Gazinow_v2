import styled from '@emotion/native';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import React, { useState } from 'react';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useRoute } from '@react-navigation/native';
import { useSaveMyRoutesQuery } from '@/global/apis/hook';
import { useQueryClient } from 'react-query';

const NameNewRouteScreen = () => {
  const { params } = useRoute();
  const { pathId } = params as { pathId: number };
  const navigation = useRootNavigation();
  const [roadName, setRoadName] = useState<string>();
  const queryClient = useQueryClient();

  const { mutate } = useSaveMyRoutesQuery({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
    onError: async (error: any) => {
      await queryClient.invalidateQueries();
      console.error(error);
    },
  });

  const newRoute = {
    roadName: roadName,
    totalTime: 0,
    subwayTransitCount: 0,
    firstStartStation: 'string',
    lastEndStation: 'string',
    subPaths: [
      {
        trafficType: 1,
        distance: 0,
        sectionTime: 0,
        stationCount: 0,
        lanes: [
          {
            name: 'string',
            subwayCode: 0,
            startName: 'string',
            endName: pathId,
          },
        ],
        subways: [
          {
            index: pathId,
            stationName: '압구정',
          },
        ],
      },
    ],
  };

  return (
    <Container>
      {/* 경로 그래프 */}
      <FontText
        value="새 경로 이름"
        textSize="14px"
        textWeight="Medium"
        lineHeight="21px"
        textColor={COLOR.BASIC_BLACK}
      />

      <InputBox>
        <Input
          placeholder="경로 이름을 입력하세요"
          value={roadName}
          onChangeText={(text) => setRoadName(text)}
          inputMode="email"
          maxLength={10}
        ></Input>
      </InputBox>

      <TextLengthBox>
        <FontText
          value={`${roadName?.length ? roadName.length : 0}/10`}
          textSize="12px"
          textWeight="Regular"
          textColor={COLOR.GRAY_999}
          lineHeight="14px"
        />
      </TextLengthBox>

      <BottomBtn
        onPress={() => {
          mutate(newRoute);
          navigation.popToTop();
        }}
        disabled={!roadName}
      >
        <FontText
          value="완료"
          textSize="17px"
          textWeight="SemiBold"
          textColor={COLOR.WHITE}
          lineHeight="26px"
        />
      </BottomBtn>
    </Container>
  );
};

export default NameNewRouteScreen;

const Container = styled.View`
  background-color: ${COLOR.WHITE};
  padding-horizontal: 16px;
  flex: 1;
`;
const InputBox = styled.Pressable`
  padding-vertical: 12px;
  padding-horizontal: 16px;
  margin-vertical: 7px;
  border-radius: 5px;
  background-color: ${COLOR.LIGHT_GRAY};
`;
const TextLengthBox = styled.View`
  align-items: flex-end;
  flex: 1;
`;
const BottomBtn = styled.Pressable`
  padding-vertical: 11px;
  border-radius: 5px;
  align-items: center;
  bottom: 41px;
  ${({ disabled }) =>
    disabled ? `background-color : #dddddd` : `background-color : ${COLOR.BASIC_BLACK};`}
`;
