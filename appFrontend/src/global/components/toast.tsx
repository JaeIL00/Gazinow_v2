import React, { useState, useEffect, useRef } from 'react';
import { Text, View, Animated, StyleSheet } from 'react-native';
import ToastLogout from '@assets/icons/toast_logout.svg';
import ToastQuit from '@assets/icons/toast_quit.svg';

const Toast = ({ onClose }) => {
  const [isToastVisible, setIsToastVisible] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsToastVisible(false);
      onClose();
    }, 4000);

    Animated.timing(fadeAnim, {
      toValue: isToastVisible ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsToastVisible(true);
    });
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {isToastVisible && (
        <Animated.View>
          <ToastLogout />
        </Animated.View>
      )}
    </>
  );
};

export default Toast;
