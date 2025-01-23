import { FontText } from '@/global/ui';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { FreshSubwayLineName, NowScreenCapsules } from '@/global/apis/entity';
import { ScrollView, View } from 'react-native';
import {
  allLines,
  pathSubwayLineNameInLine,
  freshSubwayLineNameToNowCapsuleColor,
} from '@/global/utils/subwayLine';
import { useAppSelect } from '@/store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMemo } from 'react';

interface LaneButtonsProps {
  activeButton: NowScreenCapsules;
  setActiveButton: (activeButton: NowScreenCapsules) => void;
}

//TODO: 측면 그라데이션
const LaneButtons = ({ activeButton, setActiveButton }: LaneButtonsProps) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  // 내가 저장한 경로의 노선만 가져옴
  const { myRoutes } = useGetSavedRoutesQuery();

  // 로그인 되어있으면 저장된 경로에 해당하는 노선 캡슐을 앞쪽에 배치
  const myLines = useMemo(() => {
    if (isVerifiedUser !== 'success auth') return [];
    return (
      [
        ...new Set(
          myRoutes?.flatMap((route) =>
            route.subPaths.map((sub) => pathSubwayLineNameInLine(sub.stationCode)),
          ) ?? [],
        ),
      ].sort() ?? []
    );
  }, [isVerifiedUser, myRoutes]);

  // myLines에 없는 나머지 노선
  const otherStations: FreshSubwayLineName[] = allLines.filter((line) => !myLines?.includes(line));

  return (
    <View className="bg-white">
      <View className="p-16 pt-32">
        <FontText
          text={activeButton === '전체' ? '전체 이슈' : `${activeButton} NOW`}
          className="text-20 leading-25"
          fontWeight="600"
        />
      </View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="pt-4 pb-12 mx-16 space-x-12"
      >
        {['전체', ...myLines, ...otherStations].map((capsule) => (
          <TouchableOpacity
            key={capsule}
            onPress={() => setActiveButton(capsule as NowScreenCapsules)}
            className="px-[8.48px] py-[6.79px] rounded-17"
            style={{
              backgroundColor:
                activeButton === capsule
                  ? freshSubwayLineNameToNowCapsuleColor(capsule as NowScreenCapsules)
                  : '#F5F5F5',
            }}
          >
            <FontText
              text={capsule}
              style={{
                color:
                  activeButton === capsule
                    ? 'white'
                    : freshSubwayLineNameToNowCapsuleColor(capsule as NowScreenCapsules),
              }}
              className="text-[12.92px] leading-[15.51px]"
              fontWeight="600"
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default LaneButtons;
