export const DUMMY_VALUE = 99999999 as const;

export const SUBWAY_INFO_STORAGE_KEY = 'subway_info' as const;

export const DEPARTURE_STATION = '출발역' as const;
export const ARRIVAL_STATION = '도착역' as const;

export const CHOSUNG = 'cho' as const;
export const JUNGSUNG = 'jung' as const;
export const HANGEUL_START_CHARCODE = 44032 as const; // 가 유니코드
export const CHARCODE_DIFF_INIT_CONSONANTS = 588 as const; // 까 - 가 유니코드
export const CHARCODE_DIFF_FINAL_CONSONANTS = 28 as const; // 개 - 가 유니코드
export const CHARCODE_INNER_RANGE = -1 as const; // 글자가 해당하는 범위의 끝 글자에 대한 유니코드
export const INITIAL_CONSONANTS: string[] = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
];
