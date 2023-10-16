import { Text } from 'react-native';
import type { TextProps } from 'react-native/types';

export interface NormalTextProps extends TextProps {
  value: string;
}

const NormalText = (props: NormalTextProps) => {
  const { value } = props;

  return <Text>{value}</Text>;
};

export default NormalText;
