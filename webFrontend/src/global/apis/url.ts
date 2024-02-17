type ApiName = "issue_get" | "member_reissue" | "like";

const apiUrls: {
  [key in ApiName]: string;
} = {
  issue_get: "/api/v1/issue/get",
  member_reissue: "/api/v1/member/reissue",
  like: "/api/v1/like",
};

export default apiUrls;
