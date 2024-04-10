import React, { useLayoutEffect, useMemo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { FontText, Space, TextButton } from '@/global/ui';
import { COLOR } from '@/global/constants';
import SavedRouteBox from './SavedRouteBox';
import IssueBox from './IssueBox';
import styled from '@emotion/native';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { RenderSavedRoutesType } from '@/global/apis/entity';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { NonLoggedIn } from '.';

interface SavedRouteIssuesProps {
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
}

const SavedRouteIssues = ({ isVerifiedUser }: SavedRouteIssuesProps) => {
  const navigation = useRootNavigation();
  const { data } = useGetSavedRoutesQuery({
    onSuccess: (data) => {
      const issueRoutes = data.some((savedRoute) => {
        return savedRoute.subPaths.some((subPath) => subPath.lanes[0].issueSummary.length > 0);
      });
      setHasIssueRoutes(issueRoutes);
      issueRoutes ? setActiveButton('이슈') : setActiveButton('저장경로');
    },
  });

  const [hasIssueRoutes, setHasIssueRoutes] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<'이슈' | '저장경로'>('저장경로');
  const [categoryList, setCategoryList] = useState<('이슈' | '저장경로')[]>(['저장경로', '이슈']);

  useLayoutEffect(() => {
    if (!data) return;
    setCategoryList(() => (hasIssueRoutes ? ['이슈', '저장경로'] : ['저장경로', '이슈']));
  }, [hasIssueRoutes]);

  const handleButtonClick = (buttonText: typeof activeButton) => setActiveButton(buttonText);

  const renderButton = (text: typeof activeButton) => (
    <TouchableOpacity
      key={text}
      onPress={() => handleButtonClick(text)}
      style={[
        styles.navButton,
        isVerifiedUser === 'success auth'
          ? {
              backgroundColor: activeButton === text ? '#474747' : 'white',
              borderColor: activeButton === text ? 'transparent' : COLOR.GRAY_EB,
            }
          : {
              backgroundColor: activeButton === text ? 'white' : '#EAEAEA',
              borderColor: activeButton === text ? COLOR.GRAY_EB : 'transparent',
            },
      ]}
      disabled={isVerifiedUser !== 'success auth'}
    >
      <FontText
        value={text}
        textSize="13px"
        textWeight={activeButton === text ? 'SemiBold' : 'Regular'}
        lineHeight="19px"
        textColor={
          isVerifiedUser === 'success auth' && activeButton === text ? 'white' : COLOR.GRAY_999
        }
      />
    </TouchableOpacity>
  );

  const MemoIssueBox = useMemo(() => {
    if (!data) return <></>;
    return <IssueBox savedRoutes={data} />;
  }, [data]);
  const MemoSavedRouteBox = useMemo(() => {
    if (!data) return <></>;
    return <SavedRouteBox savedRoutes={data} />;
  }, [data]);

  return (
    <Container>
      <CategoryContainer>
        <Category>{categoryList.map(renderButton)}</Category>
        <Pressable
          hitSlop={20}
          onPress={() => navigation.navigate('NewRouteNavigation', { screen: 'SavedRoutes' })}
          disabled={isVerifiedUser !== 'success auth'}
        >
          <TextButton
            value="저장경로 편집"
            textSize="12px"
            textColor={COLOR.GRAY_999}
            textWeight="Regular"
            onPress={() => navigation.navigate('NewRouteNavigation', { screen: 'SavedRoutes' })}
            lineHeight="15px"
            disabled={isVerifiedUser !== 'success auth'}
          />
        </Pressable>
      </CategoryContainer>

      <Space height="1px" backgroundColor={COLOR.GRAY_EB} />

      {/* 최근검색: <RecentSearchBox />, TODO: MVP에서 제외*/}
      <ContentsBox>
        {isVerifiedUser === 'success auth' && data ? (
          <>
            {activeButton === '이슈' && MemoIssueBox}
            {activeButton === '저장경로' && MemoSavedRouteBox}
          </>
        ) : (
          <NonLoggedIn />
        )}
      </ContentsBox>
    </Container>
  );
};

const styles = StyleSheet.create({
  navButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLOR.GRAY_EB,
    borderRadius: 17,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 8,
  },
});

export default SavedRouteIssues;
const Container = styled.View`
  margin: 16px 0 0;
  border-radius: 14px;
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const Category = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 1;
`;
const CategoryContainer = styled.View`
  margin: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${COLOR.WHITE};
  flex: 1;
`;
const ContentsBox = styled.View`
  padding: 0px 16px 4px;
  flex: 1;
`;
