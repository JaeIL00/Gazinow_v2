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

const HANGEUL_START_CHARCODE = 44032; // 가

const CHARCODE_DIFF_INIT_CONSONANTS = 588; // 까 - 가
const CHARCODE_DIFF_FINAL_CONSONANTS = 28; // 개 - 가
const CHARCODE_INNER_RANGE = -1; // 글자가 해당하는 범위의 끝 글자
const CHOSUNG = 'cho';
const JUNGSUNG = 'jung';

type WordType = typeof CHOSUNG | typeof JUNGSUNG;

const hangeulRangeReg = (jongsung: number, chosung?: number, cur?: string) => {
  if (cur) {
    return String.fromCharCode(cur.charCodeAt(0) + CHARCODE_DIFF_FINAL_CONSONANTS + jongsung);
  } else if (chosung) {
    return String.fromCharCode(
      HANGEUL_START_CHARCODE + chosung * CHARCODE_DIFF_INIT_CONSONANTS + jongsung,
    );
  }
};

const makeRegExp = (type: WordType, acc: string, cur: string, chosungIndex?: number) => {
  if (type === JUNGSUNG) {
    return acc.replace(cur, `[${cur}-${hangeulRangeReg(CHARCODE_INNER_RANGE, 999999, cur)}]`);
  } else if (type === CHOSUNG && chosungIndex) {
    const nextChosung = chosungIndex + 1;
    return acc.replace(
      cur,
      `[${hangeulRangeReg(0, chosungIndex)}-${hangeulRangeReg(CHARCODE_INNER_RANGE, nextChosung)}]`,
    );
  } else return acc;
};

const currentHangeulType = (acc: string, cur: string, arr: string[]) => {
  const chosungIndex = INITIAL_CONSONANTS.indexOf(cur);
  const isChosung = chosungIndex !== -1;
  const isJungsung =
    (cur.charCodeAt(0) - HANGEUL_START_CHARCODE) % CHARCODE_DIFF_FINAL_CONSONANTS === 0;
  const isDontMakeReg = !isChosung && (!isJungsung || arr.length > 1);

  if (isDontMakeReg) return acc;

  if (isJungsung) return makeRegExp(JUNGSUNG, acc, cur);
  else return makeRegExp(CHOSUNG, acc, cur, chosungIndex);
};

const textSearchRegExp = (searchKeyword: string) => {
  const regex = searchKeyword.split('').reduce((acc, cur, _, arr) => {
    return currentHangeulType(acc, cur, arr);
  }, searchKeyword);
  return new RegExp(regex);
};

export default textSearchRegExp;
