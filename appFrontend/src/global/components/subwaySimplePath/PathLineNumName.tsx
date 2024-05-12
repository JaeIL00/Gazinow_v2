import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { subwayLineColor, pathSubwayLineName, subwayNameCutting } from '@/global/utils';
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
          value={pathSubwayLineName(lane.stationCode)}
          textSize={lane.stationCode <= 9 ? '13px' : '6px'}
          textWeight={lane.stationCode <= 9 ? 'SemiBold' : 'Bold'}
          textColor={COLOR.WHITE}
          lineHeight={lane.stationCode > 9 ? 6 : undefined}
          style={{ letterSpacing: lane.stationCode > 9 ? -0.3 : undefined }}
        />
        {lane.stationCode <= 9 && <Space height="1px" />}
      </View>

      <View
        className="absolute flex-row"
        style={{
          top: Dimensions.get('window').fontScale * 22,
        }}
      >
        <FontText
          value={subwayNameCutting(stationName)}
          textSize="12px"
          textWeight="Medium"
          textColor={subwayLineColor(lane.stationCode)}
          textAlign="center"
        />
        {lane.direct && (
          <FontText
            className="ml-2"
            value="급행"
            textSize="12px"
            textWeight="Regular"
            textColor="#EB5147"
          />
        )}
      </View>
    </View>
  );
};

export default PathLineNumName;
