import { useParams } from "react-router-dom";
import { useGetIssue } from "./api/hooks";

const IssueDetailPage = () => {
  const { id } = useParams() as { id: string };

  const { issueData } = useGetIssue(id);
  console.log(issueData);

  return <div className="text-xl">추카해</div>;
};

export default IssueDetailPage;
