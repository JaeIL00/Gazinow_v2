import styled from '@emotion/native';
import type { TextInput, TextInputProps } from 'react-native/types';

import { COLOR } from '@/global/constants';
import { useEffect, useRef } from 'react';

interface InputProps extends TextInputProps {
  fontSize?: string;
  isBlur?: boolean;
}

const Input = (props: InputProps) => {
  const { fontSize, isBlur } = props;

  const ref = useRef<TextInput>(null);

  useEffect(() => {
    if (isBlur) ref.current?.blur();
  }, [isBlur]);

  return <StyleInput ref={ref} size={fontSize} {...props} />;
};

export default Input;

const StyleInput = styled.TextInput<{ size?: string }>`
  font-family: Pretendard-Regular;
  font-size: ${({ size }) => (size ? size : '16px')};
  line-height: 21px;
  padding: 0;
  color: ${COLOR.BASIC_BLACK};
`;
