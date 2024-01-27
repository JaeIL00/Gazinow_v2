import { SubwayCode } from '@/global/types/apis/searchTypes';
import { subwayLineColor } from '@/global/utils';
import { View } from 'react-native';

interface PathBarProps {
  subwayCode: SubwayCode;
  isFirst?: boolean;
  isLast: boolean;
}

const PathBar = ({ subwayCode, isFirst = true, isLast }: PathBarProps) => {
  return (
    <View
      style={{
        backgroundColor: subwayLineColor(subwayCode),
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
