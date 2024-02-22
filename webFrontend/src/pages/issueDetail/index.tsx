import { useParams } from "react-router-dom";
import { useGetIssue, usePostLike } from "./api/hooks";

import IconThumsUp from "@assets/icons/thumbs_up.svg?react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import color from "@global/constants/color";
import { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import localStorageFunc from "@global/utils/localStorage";
import { STORAGE_ACCESS_KEY } from "@global/constants";

dayjs.locale("ko");
dayjs.extend(relativeTime);

const IssueDetailPage = () => {
  const { id } = useParams() as { id: string };

  // TODO: MVP에서 빠짐
  // const [isOpenModal, setIsOpenModal] = useState<boolean>(true);
  // const closeModal = () => setIsOpenModal(false);

  const { doLikeMutate } = usePostLike();
  const { issueData, isLoadingIssue } = useGetIssue(id);

  const likeHandler = useMemo(
    () =>
      debounce(() => {
        if (!issueData) return;
        doLikeMutate(issueData.id);
        // TODO: 도움돼요 삭제 구현 필요
      }, 300),
    [issueData]
  );

  const createIssueDate = dayjs(issueData?.startDate).fromNow();

  const onMessageEvent = (e: MessageEvent) => {
    e.stopPropagation();
    localStorageFunc.set(STORAGE_ACCESS_KEY, String(e.data));
  };

  useEffect(() => {
    window.addEventListener("message", onMessageEvent, { capture: true });
    return () => window.removeEventListener("message", onMessageEvent);
  }, []);

  if (!issueData && !isLoadingIssue) {
    return <p>이슈 불러오기 실패 id: {id}</p>;
  }
  if (isLoadingIssue) {
    return <p>로딩 중..</p>;
  }
  return (
    <div className="relative">
      <section className="h-screen px-4 overflow-y-auto">
        <header className="mt-[19px] mb-5">
          <h1 className="mb-1 text-xl font-semibold">{issueData?.title}</h1>
          <p className="text-xs">{createIssueDate}</p>
        </header>

        <article className="py-6 border-y border-gray-eb">
          <p className="text-sm whitespace-pre-wrap text-real-black">
            {issueData?.content}
          </p>
        </article>

        <footer className="pt-[17px] flex justify-between">
          <button className="flex items-center" onClick={likeHandler}>
            <p className="text-gray-99 text-xs font-medium mr-[5px]">
              도움돼요
            </p>
            <div className="mr-px">
              <IconThumsUp color={color.GRAY99} width={15} height={15} />
            </div>
            <p className="text-gray-99 text-xs font-medium mt-[0.5px]">
              {issueData?.likeCount}
            </p>
          </button>
          {/* TODO: MVP에서 빠짐 */}
          {/* <button>
            <p className="text-xs font-medium text-gray-99">잘못된 정보 신고</p>
          </button> */}
        </footer>
      </section>
      {/* {isOpenModal && <WrongInfoModal closeModal={closeModal} />} */}
    </div>
  );
};

export default IssueDetailPage;
