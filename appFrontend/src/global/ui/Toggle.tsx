import React, { useEffect, useState } from 'react';
import { Animated, Easing, Pressable } from 'react-native';
import cn from 'classname';

type ToggleProps = {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

const Toggle = ({ isOn, onToggle, disabled }: ToggleProps) => {
  const [animatedValue] = useState(new Animated.Value(isOn ? 1 : 0));

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isOn ? 1 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [isOn, animatedValue]);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 19],
  });

  return (
    <Pressable
      className={cn('w-44 h-26 rounded-full justify-center', {
        'bg-light-blue': isOn,
        'bg-[#DFDFDF]': !isOn,
      })}
      onPress={onToggle}
      hitSlop={18}
      disabled={disabled}
    >
      <Animated.View
        className="w-24 h-24 bg-white rounded-full"
        style={{
          transform: [{ translateX }],
        }}
      />
    </Pressable>
  );
};

export default Toggle;
