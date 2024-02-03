import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { subwayLineColor, subwayLineName, subwayNameCutting } from '@/global/utils';
import { View } from 'react-native';
import { Lane } from '@/global/apis/entity';

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
          backgroundColor: subwayLineColor(lane.stationCode),
          paddingBottom: 0.5,
          marginBottom: 6,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FontText
          value={subwayLineName(lane.stationCode)}
          textSize={lane.stationCode <= 9 ? '13px' : '6px'}
          textWeight={lane.stationCode <= 9 ? 'SemiBold' : 'Bold'}
          textColor={COLOR.WHITE}
        />
        {lane.stationCode <= 9 && <View style={{ height: 2 }} />}
      </View>
      <View>
        <FontText
          value={subwayNameCutting(stationName)}
          textSize="12px"
          textWeight="Medium"
          textColor={subwayLineColor(lane.stationCode)}
          textAlign="center"
        />
      </View>
    </View>
  );
};

export default PathLineNumName;
