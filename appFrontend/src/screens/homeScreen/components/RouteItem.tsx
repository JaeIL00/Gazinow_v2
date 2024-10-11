import { MyRoutesType } from '@/global/apis/entity';
import { SubwaySimplePath } from '@/global/components';
import { COLOR } from '@/global/constants';
import { FontText, TextButton } from '@/global/ui';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { View } from 'react-native';
import IssuesBanner from './IssuesBanner';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import cn from 'classname';

interface RouteItemProps {
  route: MyRoutesType;
  hasIssues: boolean;
}

const RouteItem = ({ route, hasIssues }: RouteItemProps) => {
  const homeNavigation = useHomeNavigation();

  const filteredTotalTime =
    route.totalTime > 60
      ? Math.floor(route.totalTime / 60) + '시간 ' + (route.totalTime % 60) + '분'
      : route.totalTime + '분';

  return (
    <View className="px-16 pt-20 pb-23 border-t-1 border-gray-beb">
      <View className="flex-row items-center justify-between mb-24">
        <FontText text={route.roadName} className="text-18 text-black-717" fontWeight="700" />
        <View
          className={cn('px-6 py-4 ml-8 rounded-16', {
            'bg-[#FBDCDA]': hasIssues,
            'bg-transparent': !hasIssues,
          })}
        >
          <FontText
            text={hasIssues ? `${filteredTotalTime} 이상 예상` : `평균 ${filteredTotalTime}`}
            className={cn('text-12 leading-14', {
              'text-light-red': hasIssues,
              'text-gray-999': !hasIssues,
            })}
            fontWeight="500"
          />
        </View>
        <View className="flex-1" />

        <TouchableOpacity
          className="flex-row items-center"
          onPress={() => homeNavigation.push('SubwayPathDetail', { state: route })}
          hitSlop={20}
        >
          <FontText text="세부정보" className="text-13 leading-19 text-gray-999" />
          <View className="w-4" />
          <IconRightArrowHead color={COLOR.GRAY_999} />
        </TouchableOpacity>
      </View>
      <SubwaySimplePath
        pathData={route.subPaths}
        arriveStationName={route.lastEndStation}
        betweenPathMargin={24}
      />
      {hasIssues ? <IssuesBanner subPathss={route.subPaths} /> : null}
    </View>
  );
};

export default RouteItem;
