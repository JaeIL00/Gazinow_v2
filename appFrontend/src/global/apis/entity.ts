/**
 * 오디세이 기준 지하철 호선 이름
 */
export type RawSubwayLineName =
  | '경의중앙선'
  | '수도권 1호선'
  | '수도권 2호선'
  | '수도권 3호선'
  | '수도권 4호선'
  | '수도권 5호선'
  | '수도권 6호선'
  | '수도권 7호선'
  | '수도권 8호선'
  | '수도권 9호선'
  | '수도권 경강선'
  | '수도권 경춘선'
  | '수도권 공항철도'
  | '수도권 김포골드라인'
  | '수도권 서해선(대곡-원시)'
  | '수도권 수인.분당선'
  | '수도권 신림선'
  | '수도권 신분당선'
  | '수도권 에버라인'
  | '수도권 우이신설경전철'
  | '수도권 의정부경전철'
  | '인천 1호선'
  | '인천 2호선'
  | null;

/**
 * 가는길지금 기준 지하철 호선명
 */
export type FreshSubwayLineName =
  | '1호선'
  | '2호선'
  | '3호선'
  | '4호선'
  | '5호선'
  | '6호선'
  | '7호선'
  | '8호선'
  | '9호선'
  | '경의중앙'
  | '신분당'
  | '수인분당'
  | '공항철도'
  | '인천1호선'
  | '인천2호선'
  | '신림선'
  | '경강선'
  | '서해선'
  | '경춘선'
  | '의정부'
  | '에버라인'
  | '김포골드'
  | '우이신설';

/**
 * 나우탭 캡슐 타입
 */
export type NowScreenCapsules = FreshSubwayLineName | '전체';

/**
 * 지하철 검색 이력 타입
 */
export interface SearchHistoryStationNameTypes {
  id: number;
  stationName: string;
  stationLine: RawSubwayLineName;
}

/**
 * 지하철 검색 타입
 */
export interface SearchStationNameTypes {
  data: {
    name: string;
    line: RawSubwayLineName;
  }[];
}

/**
 * 지하철 경로 데이터 api 응답
 */
export interface SearchPathsTypes {
  paths: Path[];
}

/**
 * 지하철 경로 데이터
 */
export interface Path {
  id?: number;
  totalTime: number;
  subwayTransitCount: number;
  firstStartStation: string;
  lastEndStation: string;
  subPaths: SubPath[];
  myPath: boolean;
  myPathId: [number] | null;
}

/**
 * 지하철호선 코드
 *
 * @param oneToNine 1호선부터 9호선
 * @param n21 인천 1호선
 * @param n22 인천 2호선
 * @param n101 수도권 공항철도
 * @param n104 경의선
 * @param n107 용인 경전철(수도권 에버라인)
 * @param n108 경춘선
 * @param n109 신분당선
 * @param n110 수도권 의정부경전철
 * @param n112 경강선
 * @param n113 수도권 우이신설경전철
 * @param n114 서해선
 * @param n115 김포도시철도
 * @param n116 수인분당선
 * @param n117 신림선
 */
export type StationCode =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 21
  | 22
  | 101
  | 104
  | 107
  | 108
  | 109
  | 110
  | 112
  | 113
  | 114
  | 115
  | 116
  | 117;

/**
 * 지하철 경로 호선 데이터
 */
export interface Lane {
  direct: boolean;
  name: string;
  stationCode: StationCode;
  startName: string;
  endName: string;
  issueSummary: IssueSummary[];
}

/**
 * 지하철 경로 정보 데이터
 */
export interface SubPath {
  trafficType: number;
  distance: number;
  sectionTime: number;
  stationCount: number;
  way: string; // 지하철 운행 방향
  door: string; // 빠른환승
  lanes: Lane[];
  stations: {
    index: number;
    stationName: string;
    issueSummary: IssueSummary[];
  }[];
}

export interface SubwayStrEnd {
  strStationName: string;
  strStationLine: RawSubwayLineName;
  endStationName: string;
  endStationLine: RawSubwayLineName;
}

export interface SaveMyRoutesType extends Path {
  roadName: string;
}

export interface MyRoutesType extends Path {
  id: number;
  roadName: string;
}

export type IssueKeywords = '자연재해' | '연착' | '혼잡' | '행사' | '사고' | '공사' | '시위';

export interface IssueSummary {
  id: number;
  title: string;
  likeCount: number;
  keyword: IssueKeywords;
  agoTime: string;
}

export interface IssueContent {
  id: number;
  title: string;
  content: string;
  agoTime: string;
  lines: RawSubwayLineName[];
  likeCount: number;
  startDate: string;
  expireDate: string;
  keyword: IssueKeywords;
  stationDtos: [
    {
      line: RawSubwayLineName;
      stationName: string;
    },
  ];
}

export interface AllIssues {
  content: IssueContent[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
