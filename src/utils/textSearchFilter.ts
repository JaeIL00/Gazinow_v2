const INITIAL_CONSONANTS = [
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

const HANGUL_START_CHARCODE = 44032; // 가

const CHARCODE_DIFF_INIT_CONSONANTS = 588; // 까 - 가
const CHARCODE_DIFF_FINAL_CONSONANTS = 28; // 개 - 가
const CHARCODE_INNER_RANGE = -1; // 글자가 해당하는 범위의 끝 글자
const CHOSUNG = 'cho';
const JUNGSUNG = 'jung';

type WordType = typeof CHOSUNG | typeof JUNGSUNG;

const hangulRangeForReg = (jongsung: number, chosung?: number, cur?: string) => {
  if (cur) {
    return String.fromCharCode(cur.charCodeAt(0) + CHARCODE_DIFF_FINAL_CONSONANTS + jongsung);
  } else if (chosung) {
    return String.fromCharCode(
      HANGUL_START_CHARCODE + chosung * CHARCODE_DIFF_INIT_CONSONANTS + jongsung,
    );
  }
};

const makeRegExp = (type: WordType, acc: string, cur: string, idx?: number) => {
  if (type === JUNGSUNG) {
    return acc.replace(cur, `[${cur}-${hangulRangeForReg(CHARCODE_INNER_RANGE, 999999, cur)}]`);
  } else if (type === CHOSUNG && idx) {
    const nextChosung = idx + 1;
    return acc.replace(
      cur,
      `[${hangulRangeForReg(0, idx)}-${hangulRangeForReg(CHARCODE_INNER_RANGE, nextChosung)}]`,
    );
  } else return acc;
};

const madfasdf = (searchKeyword: string) => {
  const regex = searchKeyword.split('').reduce((acc, cur, _, arr) => {
    const idx = INITIAL_CONSONANTS.indexOf(cur);
    const isJungsung =
      (cur.charCodeAt(0) - HANGUL_START_CHARCODE) % CHARCODE_DIFF_FINAL_CONSONANTS === 0;
    if (idx === -1 && !isJungsung) return acc;
    if (idx === -1 && arr.length > 1) return acc;
    if (isJungsung) return makeRegExp(JUNGSUNG, acc, cur);
    else return makeRegExp(CHOSUNG, acc, cur, idx);
  }, searchKeyword);
  return new RegExp(regex);
};

const textSearchFilter = (searchKeyword: string, targetWord: string) => {
  return madfasdf(searchKeyword).test(targetWord);
};

export default textSearchFilter;
