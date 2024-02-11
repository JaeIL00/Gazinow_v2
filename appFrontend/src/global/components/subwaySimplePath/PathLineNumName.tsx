import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { subwayLineColor, subwayLineName, subwayNameCutting } from '@/global/utils';
import { Dimensions, View } from 'react-native';
import { Lane } from '@/global/apis/entity';

interface PathLineNumNameProps {
  lane: Lane;
  stationName: string;
}

const PathLineNumName = ({ lane, stationName }: PathLineNumNameProps) => {
  return (
    <View
      style={{
        position: 'relative',
        alignItems: 'center',
        marginBottom: Dimensions.get('window').fontScale * 22,
      }}
    >
      <View style={{ width: 42 }} />
      <View
        style={{
          width: Dimensions.get('window').fontScale * 18,
          height: Dimensions.get('window').fontScale * 18,
          borderRadius: 9999,
          backgroundColor: subwayLineColor(lane.stationCode),
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {lane.stationCode > 9 && <Space height="1px" />}
        <FontText
          value={subwayLineName(lane.stationCode)}
          textSize={lane.stationCode <= 9 ? '13px' : '6px'}
          textWeight={lane.stationCode <= 9 ? 'SemiBold' : 'Bold'}
          textColor={COLOR.WHITE}
          lineHeight={lane.stationCode > 9 ? '6px' : undefined}
          style={{ letterSpacing: lane.stationCode > 9 ? -0.3 : undefined }}
        />
        {lane.stationCode <= 9 && <Space height="1px" />}
      </View>
      <View
        style={{
          position: 'absolute',
          width: 100,
          bottom: -(Dimensions.get('window').fontScale * 22),
        }}
      >
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
