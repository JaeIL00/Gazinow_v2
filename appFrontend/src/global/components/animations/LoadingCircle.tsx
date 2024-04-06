import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingCircleLottie from './loadingCircle.json';
import { COLOR } from '@/global/constants';

interface LoadingCircleProps {
  color?: 'white' | 'gray';
  width?: number;
  height?: number;
}

const LoadingCircle = ({ color, width, height }: LoadingCircleProps) => {
  let lottieColor: number[] = [0, 0, 0];
  switch (color) {
    case 'white':
      lottieColor = COLOR.RGB_WHITE;
      break;
    case 'gray':
      lottieColor = COLOR.RGB_GRAY_999;
      break;
    default:
      break;
  }

  if (
    LoadingCircleLottie.layers &&
    LoadingCircleLottie.layers[0] &&
    LoadingCircleLottie.layers[0].shapes[2] &&
    LoadingCircleLottie.layers[0].shapes[2].c
  ) {
    LoadingCircleLottie.layers[0].shapes[2].c.k = lottieColor;
  }

  return <LottieView source={LoadingCircleLottie} style={{ width, height }} autoPlay loop />;
};

export default LoadingCircle;
