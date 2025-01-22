import { useState } from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { FontText } from '@/global/ui';
import { getIssueId } from '@/store/modules';
import { useAppDispatch } from '@/store';
import { useRootNavigation } from '@/navigation/RootNavigation';
import dayjs from 'dayjs';
import cn from 'classname';
import IconHeart from '@/assets/icons/icon-heart-mono.svg';
import { IssueGet } from '@/global/apis/entity';

interface PopularIssuesProps {
  popularIssues: IssueGet[];
}

const PopularIssues = ({ popularIssues }: PopularIssuesProps) => {
  const dispatch = useAppDispatch();
  const navigation = useRootNavigation();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <View>
      <View className="px-16 pt-24 pb-28">
        <FontText text="지금 인기 이슈" className="text-20 leading-25" fontWeight="600" />
      </View>

      <View className="px-16 pb-36">
        <View className="rounded-16 py-20 px-16 bg-[#F9FAFB]">
          {popularIssues?.map(({ id, title, expireDate, likeCount }, index) => {
            const isExpired = dayjs().isAfter(dayjs(expireDate));
            if (!isExpanded && index !== 0) return null;
            return (
              <Pressable
                style={({ pressed }) => ({
                  //TODO: Pressed 디자인 나오면
                  //   backgroundColor: pressed ? COLOR.GRAY_E5 : 'transparent',
                  marginTop: index === 0 ? 0 : 36,
                })}
                onPress={() => {
                  dispatch(getIssueId(id));
                  navigation.navigate('IssueStack', { screen: 'IssueDetail' });
                }}
                key={`${id}_${index}`}
              >
                <View className="flex-row space-x-10">
                  <FontText text={`${index + 1}`} className="w-12" fontWeight="700" />
                  <View className="space-y-12">
                    <FontText text={title} fontWeight="500" numberOfLines={2} />
                    <View className="flex-row items-center space-x-8">
                      <View className="flex-row items-center space-x-4">
                        <View
                          className={cn('w-6 h-6 rounded-full bg-light-red', {
                            'bg-gray-999': isExpired,
                          })}
                        />
                        <FontText
                          text={isExpired ? '종료' : '진행중'}
                          className={cn('text-13 leading-19 text-light-red ', {
                            'text-gray-999': isExpired,
                          })}
                        />
                      </View>
                      <View className="w-1 h-10 bg-[#D9D9D9]" />
                      <View className="flex-row items-center space-x-4">
                        <IconHeart color="#D1D6DB" width={18} height={18} />
                        <FontText
                          text={'' + likeCount}
                          className="text-13 leading-19 text-gray-999"
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            );
          })}
          <View className="flex-row-reverse">
            <TouchableOpacity onPress={() => setIsExpanded((prev) => !prev)} hitSlop={30}>
              <FontText
                text={isExpanded ? '접기' : '펼쳐보기'}
                className="text-right text-13 leading-19 text-gray-999"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View className="h-16 bg-gray-9f9" />
    </View>
  );
};
export default PopularIssues;
