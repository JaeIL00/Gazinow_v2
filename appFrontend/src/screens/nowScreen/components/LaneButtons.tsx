import React from 'react';
import { FontText } from '@/global/ui';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { FreshSubwayLineName, NowScreenCapsules, SubPath } from '@/global/apis/entity';
import { ScrollView, View } from 'react-native';
import { allLines, pathSubwayLineNameInLine } from '@/global/utils/subwayLine';
import { useAppSelect } from '@/store';
import { TouchableOpacity } from 'react-native-gesture-handler';
import cn from 'classname';

interface LaneButtonsProps {
  activeButton: NowScreenCapsules;
  setActiveButton: (activeButton: NowScreenCapsules) => void;
  titleNotShown: boolean;
}

//TODO: + 버튼 구현
const LaneButtons = ({ activeButton, setActiveButton, titleNotShown }: LaneButtonsProps) => {
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  // 내가 저장한 경로의 노선만 가져옴
  const { myRoutes } = useGetSavedRoutesQuery();

  let savedStations: string[] | undefined;

  // isVerifiedUser 상태에 따라 표시할 노선 캡슐 변경
  if (isVerifiedUser === 'success auth') {
    savedStations = myRoutes?.reduce((acc, current) => {
      const { subPaths } = current;
      const lineOfSubPath = subPaths.map((sub: SubPath) => {
        return pathSubwayLineNameInLine(sub.stationCode);
      });
      return Array.from(new Set([...acc, ...lineOfSubPath])).sort();
    }, [] as string[]);
  } else {
    savedStations = [];
  }

  // savedStations에 없는 나머지 노선
  const otherStations: FreshSubwayLineName[] = allLines.filter(
    (line) => !savedStations?.includes(line),
  );

  return (
    <View className="bg-white">
      {!titleNotShown ? (
        <View className="px-16 pt-24 pb-12">
          <FontText
            text={activeButton === '전체' ? '전체' : `${activeButton} NOW`}
            className="text-20 leading-25"
            fontWeight="600"
          />
        </View>
      ) : (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="flex-row py-12"
        >
          <View className="w-16" />
          {savedStations &&
            ['전체', ...savedStations, ...otherStations].map((text) => (
              <TouchableOpacity
                key={text}
                onPress={() => setActiveButton(text as NowScreenCapsules)}
                className={cn('px-12 py-8 mr-6 rounded-999 border-1', {
                  'bg-black-717 border-transparent': activeButton === text,
                  'bg-white border-gray-beb': activeButton !== text,
                })}
              >
                <FontText
                  text={text}
                  className={cn('text-14', {
                    'text-white': activeButton === text,
                    'text-[#969696]': activeButton !== text,
                  })}
                  fontWeight="500"
                />
              </TouchableOpacity>
            ))}
          <View className="w-16" />
        </ScrollView>
      )}
    </View>
  );
};

export default LaneButtons;
