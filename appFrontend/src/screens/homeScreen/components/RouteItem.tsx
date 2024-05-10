import { MyRoutesType } from '@/global/apis/entity';
import { SubwaySimplePath } from '@/global/components';
import { COLOR } from '@/global/constants';
import { FontText, TextButton } from '@/global/ui';
import { useHomeNavigation } from '@/navigation/HomeNavigation';
import { View } from 'react-native';
import IssuesBanner from './IssuesBanner';
import IconRightArrowHead from '@/assets/icons/right_arrow_head.svg';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    <View className="px-16 pt-20 pb-23 border-t-1 border-gray-eb">
      <View className="flex-row justify-between items-center mb-24">
        <FontText
          value={route.roadName}
          textSize={'18px'}
          textWeight={'Bold'}
          textColor={COLOR.BASIC_BLACK}
        />
        <View
          className={`${hasIssues ? 'bg-[#FBDCDA]' : 'bg-transparent'} px-6 py-4 ml-8 rounded-16`}
        >
          <FontText
            value={hasIssues ? `${filteredTotalTime} 이상 예상` : `평균 ${filteredTotalTime}`}
            textSize={'12px'}
            textWeight={'Medium'}
            textColor={hasIssues ? COLOR.LIGHT_RED : COLOR.GRAY_999}
            lineHeight={14}
          />
        </View>
        <View className="flex-1" />

        <TouchableOpacity className="flex-row items-center">
          <TextButton
            value={'세부정보'}
            textSize={'13px'}
            textWeight={'Regular'}
            lineHeight={19}
            textColor={COLOR.GRAY_999}
            onPress={() => homeNavigation.push('SubwayPathDetail', { state: route })}
            hitSlop={20}
          />
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
