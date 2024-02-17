import { useParams } from "react-router-dom";
import { useGetIssue } from "./api/hooks";

import IconThumsUp from "@assets/icons/thumbs_up.svg?react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import color from "@global/constants/color";
dayjs.locale("ko");

const IssueDetailPage = () => {
  const { id } = useParams() as { id: string };

  dayjs.extend(relativeTime);

  const { issueData } = useGetIssue(id);
  console.log(issueData);
  const createIssueDate = dayjs(issueData?.startDate).fromNow();

  if (!issueData) return;
  return (
    <section className="h-screen px-4 overflow-y-auto">
      <header className="mt-[19px] mb-5">
        <h1 className="text-xl font-semibold mb-1">{issueData.title}</h1>
        <p className="text-xs">{createIssueDate}</p>
      </header>

      <article className="py-6 border-y border-gray-eb">
        <p className="whitespace-pre-wrap text-black text-sm">
          {issueData.content}
        </p>
      </article>

      <footer className="pt-[17px] flex justify-between">
        <div className="flex items-center">
          <p className="text-gray-99 text-xs font-medium mr-[5px]">도움돼요</p>
          <button className="mr-px">
            <IconThumsUp color={color.GRAY99} width={15} height={15} />
          </button>
          <p className="text-gray-99 text-xs font-medium mt-[0.5px]">
            {issueData.likeCount}
          </p>
        </div>
        <button>
          <p className="text-gray-99 text-xs font-medium">잘못된 정보 신고</p>
        </button>
      </footer>
    </section>
  );
};

export default IssueDetailPage;
