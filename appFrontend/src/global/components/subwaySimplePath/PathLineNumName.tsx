import { Dimensions, View } from 'react-native';
import cn from 'classname';
import { FontText, Space } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { subwayLineColor, pathSubwayLineName, subwayNameCutting } from '@/global/utils';
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
      <View className="w-42" />
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
        {lane.stationCode > 9 && <Space height={1} />}
        <FontText
          text={pathSubwayLineName(lane.stationCode)}
          fontWeight={lane.stationCode <= 9 ? '600' : '700'}
          className={cn('text-6 text-white', {
            'text-13': lane.stationCode <= 9,
            'leading-[6px] -tracking-[0.3]': lane.stationCode > 9,
          })}
        />
        {lane.stationCode <= 9 && <Space height={1} />}
      </View>

      <View
        className="absolute flex flex-col justify-center w-54"
        style={{
          top: Dimensions.get('window').fontScale * 22,
        }}
      >
        <FontText
          text={subwayNameCutting(stationName.split('(')[0])}
          className="text-xs text-center"
          fontWeight="500"
          style={{ color: subwayLineColor(lane.stationCode) }}
        />
        {lane.direct && <FontText text="급행" className="text-xs text-center text-light-red" />}
      </View>
    </View>
  );
};

export default PathLineNumName;
