import { COLOR } from '@/global/constants';
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

  const createIssueDate = dayjs(issueData?.startDate).fromNow();

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
                value={`로그인 후 이용할 수 있어요`}
                textSize="18px"
                textWeight="SemiBold"
                style={{ textAlign: 'center' }}
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
              <FontText value={issueData.title} textSize="20px" textWeight="Bold" />
              <FontText value={createIssueDate} textSize="12px" textWeight="Regular" />
            </View>
            <View
              style={{
                paddingVertical: 24,
                borderColor: COLOR.GRAY_EB,
                borderTopWidth: 1,
                borderBottomWidth: 1,
              }}
            >
              <FontText value={issueData.content} textSize="14px" textWeight="Regular" />
            </View>

            <View
              style={{
                paddingTop: 17,
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
                  value="도움돼요"
                  textSize="12px"
                  textWeight="Medium"
                  textColor={issueData.isLike ? COLOR.LIGHT_BLUE : COLOR.GRAY_999}
                  style={{ marginRight: 5 }}
                />
                <IconThumsUp
                  color={issueData?.isLike ? COLOR.LIGHT_BLUE : COLOR.GRAY_999}
                  width={15}
                  height={15}
                  style={{ marginRight: 1 }}
                />
                <FontText
                  value={issueData.likeCount + ''}
                  textSize="12px"
                  textWeight="Medium"
                  textColor={issueData.isLike ? COLOR.LIGHT_BLUE : COLOR.GRAY_999}
                />
              </TouchableOpacity>
              {/* TODO: MVP에서 빠짐 */}
              {/* <button>
            <p className="text-xs font-medium text-gray-99">잘못된 정보 신고</p>
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
