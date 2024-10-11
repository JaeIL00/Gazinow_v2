import { View } from 'react-native';

interface SpaceProps {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

const Space = ({ width, height, backgroundColor }: SpaceProps) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: backgroundColor,
      }}
    />
  );
};

export default Space;
