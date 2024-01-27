import styled from '@emotion/native';
import type { StyleProp, TextProps } from 'react-native/types';

import { COLOR } from '@/global/constants';
import { TextStyle } from 'react-native';

interface NormalTextProps extends TextProps, TextStyleProps {
  value: string;
}

const FontText = (props: NormalTextProps) => {
  const { value } = props;

  return <Normal {...props}>{value}</Normal>;
};

export default FontText;

interface TextStyleProps {
  textSize: string;
  textWeight: 'Bold' | 'SemiBold' | 'Medium' | 'Regular';
  textColor?: string;
  lineHeight?: string;
  textAlign?: 'center';
}
const weight = (weightText: TextStyleProps['textWeight']) => {
  switch (weightText) {
    case 'Bold':
      return '700';
    case 'SemiBold':
      return '600';
    case 'Medium':
      return '500';
    case 'Regular':
      return '400';
    default:
      return '400';
  }
};
const Normal = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
  font-family: Pretendard-${({ textWeight }) => textWeight};
  font-weight: ${({ textWeight }) => weight(textWeight)};
  color: ${({ textColor = COLOR.BASIC_BLACK }) => textColor};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;
