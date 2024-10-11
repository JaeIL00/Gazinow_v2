import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native/types';

import { useEffect, useRef } from 'react';
import cn from 'classname';

interface InputProps extends TextInputProps {
  fontSize?: string;
  isBlur?: boolean;
}

const Input = (props: InputProps) => {
  const { className, isBlur } = props;

  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (isBlur) ref.current?.blur();
  }, [isBlur]);

  return (
    <TextInput
      ref={ref}
      className={cn('font-[Pretendard-Regular] text-16 leadinig-21 p-0 text-black-717', className)}
      {...props}
    />
  );
};

export default Input;
