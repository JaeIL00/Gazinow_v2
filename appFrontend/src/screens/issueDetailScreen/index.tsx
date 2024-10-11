import { COLOR } from '@/global/constants';
import cn from 'classname';
import { useAppSelect } from '@/store';
import { useMemo, useState } from 'react';
import { Modal, SafeAreaView, ScrollView, TouchableOpacity, View } from 'react-native';
import IconLeftArrowHead from '@assets/icons/left_arrow_head.svg';
import { useRootNavigation } from '@/navigation/RootNavigation';
import { useDeletePostLike, useGetIssue, usePostLike } from './api/hooks';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { FontText, TextButton } from '@/global/ui';
import IconThumsUp from '@assets/icons/thumbs_up.svg';

dayjs.locale('ko');
dayjs.extend(relativeTime);

const IssueDetailScreen = () => {
  const navigation = useRootNavigation();
  const issueId = useAppSelect((state) => state.subwaySearch.issueId);
  const isVerifiedUser = useAppSelect((state) => state.auth.isVerifiedUser);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(false);

  const { issueData, refetchIssue } = useGetIssue({
    issueId,
  });
  const { doLikeMutate } = usePostLike({ onSuccess: refetchIssue });
  const { deleteLikeMutate } = useDeletePostLike({ onSuccess: refetchIssue });

  const likeHandler = useMemo(
    () =>
      debounce(() => {
        if (!issueData) return;
        if (isVerifiedUser !== 'success auth') setIsOpenLoginModal(true);
        else if (issueData.isLike) deleteLikeMutate(issueData.id);
        else doLikeMutate(issueData.id);
      }, 300),
    [issueData, isVerifiedUser],
  );

  const startIssueDate = dayjs(issueData?.startDate).fromNow();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR.GRAY_F9 }}>
      {isOpenLoginModal && (
        <Modal visible onRequestClose={() => setIsOpenLoginModal(false)} transparent>
          <View
            style={{
              position: 'relative',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: '#00000099',
                position: 'absolute',
                top: 0,
                width: '100%',
                height: '100%',
              }}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: COLOR.WHITE,
                paddingTop: 32,
                paddingBottom: 24,
                paddingHorizontal: 24,
                borderRadius: 12,
                width: '80%',
              }}
            >
              <FontText
                text="로그인 후 이용할 수 있어요"
                className="text-center text-18"
                fontWeight="500"
              />
              <View style={{ flexDirection: 'row', width: '100%', columnGap: 8, marginTop: 30 }}>
                <TextButton
                  value="취소"
                  textSize="14px"
                  textColor={COLOR.GRAY_999}
                  textWeight="SemiBold"
                  onPress={() => setIsOpenLoginModal(false)}
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: COLOR.GRAY_999,
                    alignItems: 'center',
                    paddingVertical: 12,
                  }}
                />
                <TextButton
                  value="로그인"
                  textSize="14px"
                  textColor={COLOR.WHITE}
                  textWeight="SemiBold"
                  onPress={() => {
                    setIsOpenLoginModal(false);
                    navigation.navigate('AuthStack', { screen: 'Landing' });
                  }}
                  style={{
                    flex: 1,
                    borderRadius: 5,
                    alignItems: 'center',
                    paddingVertical: 12,
                    backgroundColor: COLOR.BASIC_BLACK,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
      <View style={{ padding: 16 }}>
        <TouchableOpacity activeOpacity={1} hitSlop={20} onPress={() => navigation.goBack()}>
          <IconLeftArrowHead color="#3F3F46" />
        </TouchableOpacity>
      </View>

      {issueData && (
        <View style={{ position: 'relative', flex: 1 }}>
          <ScrollView
            style={{ flex: 1, paddingHorizontal: 16 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={{ marginBottom: 20 }}>
              <FontText text={issueData.title} className="text-20" fontWeight="600" />
              <FontText text={startIssueDate} className="text-12" />
            </View>
            <View
              style={{
                paddingVertical: 24,
                borderColor: COLOR.GRAY_EB,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            >
              <FontText text={issueData.content} className="text-black leading-21" />
            </View>

            <View
              style={{
                paddingVertical: 17,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={likeHandler}
                activeOpacity={1}
                hitSlop={20}
              >
                <FontText
                  text="도움돼요"
                  className={cn('text-14 mr-5 -tracking-[0.2]', {
                    'text-light-blue': issueData.isLike,
                    'text-gray-999': !issueData.isLike,
                  })}
                  fontWeight="500"
                />
                <IconThumsUp
                  color={issueData?.isLike ? COLOR.LIGHT_BLUE : COLOR.GRAY_999}
                  width={15}
                  height={15}
                  style={{ marginRight: 1 }}
                />
                <FontText
                  text={issueData.likeCount + ''}
                  className={cn('text-12', {
                    'text-light-blue': issueData.isLike,
                    'text-gray-999': !issueData.isLike,
                  })}
                  fontWeight="500"
                />
              </TouchableOpacity>
              {/* TODO: MVP에서 빠짐 */}
              {/* <button>
            <p className="text-xs font-medium text-gray-999">잘못된 정보 신고</p>
          </button> */}
            </View>
          </ScrollView>
          {/* {isOpenModal && <WrongInfoModal closeModal={closeModal} />} */}
        </View>
      )}
    </SafeAreaView>
  );
};

export default IssueDetailScreen;
