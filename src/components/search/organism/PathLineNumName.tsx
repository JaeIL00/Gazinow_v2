import { FontText } from '@/components/common/atoms';
import { COLOR } from '@/constants';
import { Lane } from '@/types/apis/searchTypes';
import { subwayLineColor, subwayLineName, subwayNameCutting } from '@/utils';
import { View } from 'react-native';

interface PathLineNumNameProps {
  lane: Lane;
  stationName: string;
}

const PathLineNumName = ({ lane, stationName }: PathLineNumNameProps) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <View style={{ width: 42 }} />
      <View
        style={{
          width: 18,
          height: 18,
          borderRadius: 9999,
          backgroundColor: subwayLineColor(lane.subwayCode),
          paddingBottom: 0.5,
          marginBottom: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontText
          value={subwayLineName(lane.subwayCode)}
          textSize={lane.subwayCode <= 9 ? '13px' : '6px'}
          textWeight={lane.subwayCode <= 9 ? 'SemiBold' : 'Bold'}
          textColor={COLOR.WHITE}
        />
      </View>
      <View>
        <FontText
          value={subwayNameCutting(stationName.replace('역', ''))}
          textSize="12px"
          textWeight="Medium"
          textColor={subwayLineColor(lane.subwayCode)}
          textAlign="center"
        />
      </View>
    </View>
  );
};

export default PathLineNumName;
