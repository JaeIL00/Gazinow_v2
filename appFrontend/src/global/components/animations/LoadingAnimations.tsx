import React from 'react';
import LottieView from 'lottie-react-native';

const LoadingAnimations = () => {
  return (
    <LottieView
      source={require('./lottie_loading_normal.json')}
      style={{ height: 50, width: '100%' }}
      autoPlay
      loop
    />
  );
};

export default LoadingAnimations;
