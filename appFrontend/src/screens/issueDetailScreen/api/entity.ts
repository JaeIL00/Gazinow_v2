import { IssueKeywords, RawSubwayLineName } from '@global/apis/entity';

/**
 * 상세 이슈 조회 응답
 */
export interface IssueGet {
  id: number;
  title: string;
  content: string;
  agoTime: string;
  line: string[] | null;
  like: boolean;
  likeCount: number;
  keyword: IssueKeywords;
  /**
   * @format timestamp
   */
  startDate: string;
  /**
   * @format timestamp
   */
  expireDate: string;
  stationDtos: [
    {
      line: RawSubwayLineName;
      stationName: string;
    },
  ];
}

/**
 * 이슈 댓글 등록
 */
export interface PostCommentType {
  issueCommentContent: string;
  issueId: number;
}

/**
 * 이슈 댓글 신고 사유
 */
export type CommentReportReasonType =
  | 'INAPPROPRIATE_LANGUAGE'
  | 'MISLEADING_INFORMATION'
  | 'INAPPROPRIATE_CONTENT'
  | 'OTHER';

/**
 * 이슈 댓글 신고
 */
export interface CommentReportType {
  reportedCommentId: number;
  reason: CommentReportReasonType;
  reasonDescription?: string;
}
