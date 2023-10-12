import styled from '@emotion/native';
import type { TextProps } from 'react-native/types';

interface NormalTextProps extends TextProps, TextStyleProps {
  value: string;
  textSize: string;
}

const NormalText = (props: NormalTextProps) => {
  const { value } = props;

  return <Normal {...props}>{value}</Normal>;
};

export default NormalText;

interface TextStyleProps {
  textSize: string;
}
const Normal = styled.Text<TextStyleProps>`
  font-size: ${({ textSize }) => textSize};
`;
