import styled from '@emotion/native';
import type { TextProps } from 'react-native/types';

import { COLOR } from '@/global/constants';

interface NormalTextProps extends TextProps, TextStyleProps {
  value: string;
}

const FontText = (props: NormalTextProps) => {
  const { value, textWeight } = props;

  if (textWeight === 'Bold') return <Bold {...props}>{value}</Bold>;
  if (textWeight === 'SemiBold') return <SemiBold {...props}>{value}</SemiBold>;
  if (textWeight === 'Medium') return <Medium {...props}>{value}</Medium>;
  if (textWeight === 'Regular') return <Regular {...props}>{value}</Regular>;
  return <Regular {...props}>{value}</Regular>;
};

export default FontText;

interface TextStyleProps {
  textSize: string;
  textWeight: 'Bold' | 'SemiBold' | 'Medium' | 'Regular';
  textColor?: string;
  lineHeight?: string;
  textAlign?: 'center';
}

const Bold = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
  font-family: Pretendard-Bold;
  color: ${({ textColor = COLOR.BASIC_BLACK }) => textColor};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;
const SemiBold = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
  font-family: Pretendard-SemiBold;
  color: ${({ textColor = COLOR.BASIC_BLACK }) => textColor};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;
const Medium = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
  font-family: Pretendard-Medium;
  color: ${({ textColor = COLOR.BASIC_BLACK }) => textColor};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;
const Regular = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
  font-family: Pretendard-Regular;
  color: ${({ textColor = COLOR.BASIC_BLACK }) => textColor};
  line-height: ${({ lineHeight }) => lineHeight};
  text-align: ${({ textAlign }) => textAlign};
`;
