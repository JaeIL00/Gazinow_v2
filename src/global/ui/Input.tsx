import styled from '@emotion/native';
import type { TextInputProps } from 'react-native/types';

import { COLOR } from '@/global/constants';

interface InputProps extends TextInputProps {
  fontSize?: string;
}

const Input = (props: InputProps) => {
  const { fontSize } = props;
  return <StyleInput size={fontSize} {...props} />;
};

export default Input;

const StyleInput = styled.TextInput<{ size?: string }>`
  font-family: Pretendard-Regular;
  font-size: ${({ size }) => (size ? size : '16px')};
  line-height: 21px;
  padding: 0;
  color: ${COLOR.BASIC_BLACK};
`;
