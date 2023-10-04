import { TextInput } from 'react-native';
import type { TextInputProps } from 'react-native/types';

interface InputProps extends TextInputProps {}

const Input = (props: InputProps) => {
  return <TextInput {...props} />;
};

export default Input;
