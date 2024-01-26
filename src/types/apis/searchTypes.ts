export type subwayLine =
  | '01호선'
  | '02호선'
  | '3호선'
  | '04호선'
  | '05호선'
  | '06호선'
  | '07호선'
  | '08호선'
  | '09호선'
  | '공항철도'
  | '경의중앙선'
  | '경춘선'
  | '수인분당선'
  | '신분당선'
  | '경강선'
  | '서해선'
  | '인천선'
  | '인천2호선'
  | '용인경전철'
  | '의정부경전철'
  | '우이신설경전철'
  | '김포도시철도';

export interface SearchSubwayNameTypes {
  data: {
    name: string;
    line: subwayLine;
  }[];
}

export interface SearchHistoryTypes {
  data: { id: number; stationName: string; stationLine: string; stationCode: number }[];
}

export interface SearchPathsTypes {
  paths: Path[];
}

export interface Path {
  totalTime: number;
  subwayTransitCount: number;
  firstStartStation: string;
  lastEndStation: string;
  subPaths: SubPath[];
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
export type SubwayCode =
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

export interface Lane {
  name: string;
  subwayCode: SubwayCode;
  startName: string;
  endName: string;
}

export interface SubPath {
  trafficType: number;
  distance: number;
  sectionTime: number;
  stationCount: number;
  lanes: Lane[];
  subways: {
    index: number;
    stationName: string;
  }[];
}

export interface SubwayStrEnd {
  strSubwayName: string;
  strSubwayLine: string;
  endSubwayName: string;
  endSubwayLine: string;
}

export interface SavedRoute extends Path {
  roadName: string;
}
