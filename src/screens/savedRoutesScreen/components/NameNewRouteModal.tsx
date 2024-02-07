import styled from '@emotion/native';
import { FontText, Input } from '@/global/ui';
import { COLOR } from '@/global/constants';
import React, { useMemo, useState } from 'react';
import { useSaveMyRoutesQuery } from '@/global/apis/hook';
import { useQueryClient } from 'react-query';
import { SubwaySimplePath } from '@/global/components';
import { Path, SubPath } from '@/global/apis/entity';
import { Image } from 'react-native';
import { iconPath } from '@/assets/icons/iconPath';

interface ModalProps {
  item: Path;
  onCancel: () => void;
  setIsOpenSelectNewRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenSelectNewRouteModal: boolean;
  isNameNewRouteModalOpened: boolean;
  setIsNameNewRouteModalOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

const NameNewRouteModal = ({
  item,
  setIsOpenSelectNewRouteModal,
  setIsNameNewRouteModalOpened,
}: ModalProps) => {
  const [roadName, setRoadName] = useState<string>();
  const [isDuplicatedName, setIsDuplicatedName] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const freshSubPathData: SubPath[] = useMemo(() => {
    const subPaths = item?.subPaths || [];
    return subPaths.filter((subPath) => !!subPath.lanes.length && !!subPath.stations.length);
  }, [item]);

  const { mutate } = useSaveMyRoutesQuery({
    onSuccess: async () => {
      await queryClient.invalidateQueries();
      setIsNameNewRouteModalOpened(false);
      setIsOpenSelectNewRouteModal(false);
    },
    onError: async (error: any) => {
      await queryClient.invalidateQueries();
      if (error.response.status === 409) {
        setIsDuplicatedName(true);
      }
    },
  });

  return (
    <Container>
      <SubPathContainer>
        <SubwaySimplePath
          pathData={freshSubPathData}
          arriveStationName={item.lastEndStation}
          betweenPathMargin={24}
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
        {isDuplicatedName && (
          <MessageContainer>
            <Image source={iconPath.x_circle} style={{ width: 14, height: 14 }} />
            <FontText
              value={` 이미 존재하는 이름입니다`}
              textSize="12px"
              textWeight="Medium"
              lineHeight="14px"
              textColor={COLOR.LIGHT_RED}
            />
          </MessageContainer>
        )}
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
          mutate({
            roadName: roadName,
            lastEndStation: item.lastEndStation,
            subPaths: freshSubPathData,
          });
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

export default NameNewRouteModal;

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
  background-color: ${COLOR.GRAY_F9};
`;
const TextLengthBox = styled.View`
  align-items: flex-start;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;
const MessageContainer = styled.View`
  flex-direction: row;
  margin: 8px 0 0 9px;
`;
const BottomBtn = styled.Pressable`
  padding-vertical: 11px;
  border-radius: 5px;
  align-items: center;
  bottom: 41px;
  ${({ disabled }) =>
    disabled ? `background-color : #dddddd` : `background-color : ${COLOR.BASIC_BLACK};`}
`;
