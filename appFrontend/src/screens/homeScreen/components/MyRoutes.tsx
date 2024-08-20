import { View } from 'react-native';
import { FontText } from '@/global/ui';
import { COLOR } from '@/global/constants';
import { useGetSavedRoutesQuery } from '@/global/apis/hooks';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { NonLoggedIn, RouteItem, NoRoutes } from '.';
import { useEffect } from 'react';
import { useQueryClient } from 'react-query';

interface MyRoutesProps {
  isVerifiedUser: 'success auth' | 'fail auth' | 'yet';
  isRefreshing: boolean;
  setIsRefreshing: (isRefreshing: boolean) => void;
}

const MyRoutes = ({ isVerifiedUser, isRefreshing, setIsRefreshing }: MyRoutesProps) => {
  const navigation = useRootNavigation();
  const { myRoutes, getSavedRoutesRefetch } = useGetSavedRoutesQuery();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries(['getRoads']);
    if (isRefreshing) {
      getSavedRoutesRefetch();
    }
    setIsRefreshing(false);
  }, [isRefreshing]);

  const editMyRoutesHandler = () =>
    isVerifiedUser === 'success auth'
      ? navigation.navigate('NewRouteNavigation', { screen: 'SavedRoutes' })
      : navigation.navigate('AuthStack', { screen: 'Landing' });

  const renderMyRoutes = () => {
    if (isVerifiedUser !== 'success auth') {
      return <NonLoggedIn />;
    }
    if (myRoutes && myRoutes.length < 1) {
      return <NoRoutes />;
    }
    return myRoutes?.map((myRoute) => {
      const hasIssues = myRoute.subPaths.some(
        (subPath) => subPath.lanes[0].issueSummary.length > 0,
      );
      return <RouteItem key={myRoute.id} route={myRoute} hasIssues={hasIssues} />;
    });
  };

  return (
    <View className="bg-white my-16 rounded-14">
      <View className="p-16 flex-row justify-between items-center">
        <FontText
          value="내가 저장한 경로"
          textSize="18px"
          textWeight="SemiBold"
          textColor={isVerifiedUser === 'success auth' ? COLOR.REAL_BLACK : COLOR.GRAY_999}
          lineHeight={23}
        />
        <TouchableOpacity onPress={editMyRoutesHandler} hitSlop={20}>
          <FontText
            value="저장경로 편집"
            textSize="12px"
            textWeight="Regular"
            lineHeight={15}
            textColor={COLOR.GRAY_999}
          />
        </TouchableOpacity>
      </View>
      {renderMyRoutes()}
    </View>
  );
};

export default MyRoutes;
