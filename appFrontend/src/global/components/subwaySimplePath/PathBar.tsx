import { StationCode } from '@/global/apis/entity';
import { subwayLineColor } from '@/global/utils';
import { View } from 'react-native';

interface PathBarProps {
  StationCode: StationCode;
  isFirst?: boolean;
  isLast: boolean;
}

const PathBar = ({ StationCode, isFirst, isLast }: PathBarProps) => {
  return (
    <View
      style={{
        backgroundColor: subwayLineColor(StationCode),
        height: 3,
        flex: 1,
        marginTop: 7.5,
        marginRight: isLast ? 18 : null,
        marginLeft: isFirst ? 18 : null,
      }}
    />
  );
};

export default PathBar;
