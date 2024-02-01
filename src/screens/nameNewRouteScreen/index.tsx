import styled from '@emotion/native';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import React, { useMemo, useState } from 'react';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useRoute } from '@react-navigation/native';
import { useSaveMyRoutesQuery } from '@/global/apis/hook';
import { useQueryClient } from 'react-query';
import { SubwaySimplePath } from '@/global/components';
import { Path, SubPath } from '@/global/apis/entity';

interface RouteParams {
  lastEndStation: string;
}

const NameNewRouteScreen = () => {
  const route = useRoute();
  const navigation = useRootNavigation();
  const [roadName, setRoadName] = useState<string>();
  const queryClient = useQueryClient();

  const freshSubPathData: SubPath[] = useMemo(() => {
    const { subPaths } = route.params as Path;
    return Object.values(subPaths).filter((item) => !!item.lanes.length && !!item.stations.length);
  }, [route]);

  const { mutate } = useSaveMyRoutesQuery({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
    onError: async (error: any) => {
      await queryClient.invalidateQueries();
      console.error(error);
    },
  });

  return (
    <Container>
      <SubPathContainer>
        <SubwaySimplePath
          pathData={freshSubPathData}
          arriveStationName={(route.params as RouteParams)?.lastEndStation}
        />
      </SubPathContainer>
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
          mutate({ roadName: roadName, ...(route.params as Path), subPaths: freshSubPathData });
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
const SubPathContainer = styled.View`
  margin-top: 48px;
  margin-bottom: 40px;
  margin-horizontal: 33px;
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
