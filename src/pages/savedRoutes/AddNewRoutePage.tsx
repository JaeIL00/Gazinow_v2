import React from 'react';
import { StyleSheet } from 'react-native';
import styled from '@emotion/native';
import { SwapSubwayStation } from '@/components/home/organism';
import { COLOR } from '@/constants';

const AddNewRoutePage = () => {
  //   const editRouteNavigation = useEditRouteNavigation();
  return (
    <Container>
      <SwapSubwayStation isWrap={true} />
    </Container>
  );
};

const Container = styled.View`
  padding: 0 16px;
  flex-direction: column;
  background-color: ${COLOR.LIGHT_GRAY};
`;

const styles = StyleSheet.create({

});

export default AddNewRoutePage;
