import React from 'react';
import LottieView from 'lottie-react-native';
import LoadingDotsLottie from './loadingDots.json';

interface LoadingDotsProps {
  width?: number;
  height?: number;
}

const LoadingDots = ({ width, height }: LoadingDotsProps) => {
  return <LottieView source={LoadingDotsLottie} style={{ width, height }} autoPlay loop />;
};

export default LoadingDots;
