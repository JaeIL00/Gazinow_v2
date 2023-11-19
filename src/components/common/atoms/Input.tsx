import styled from '@emotion/native';
import type { TextInputProps } from 'react-native/types';

import { COLOR } from '@/constants';

interface InputProps extends TextInputProps {}

const Input = (props: InputProps) => {
  return <StyleInput {...props} />;
};

export default Input;

const StyleInput = styled.TextInput`
  font-family: Pretendard-Regular;
  font-size: 16px;
  line-height: 21px;
  padding: 0;
  color: ${COLOR.BASIC_BLACK};
`;
