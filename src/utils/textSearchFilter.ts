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

const hangulRangeForReg = (chosung: number, jungsung: number, jongsung: number) => {
  return String.fromCharCode(
    HANGUL_START_CHARCODE +
      chosung * CHARCODE_DIFF_INIT_CONSONANTS +
      jungsung * CHARCODE_DIFF_FINAL_CONSONANTS +
      jongsung,
  );
};

const makeRegExp = (searchKeyword: string) => {
  const regex = INITIAL_CONSONANTS.reduce(
    (acc, cur, idx) =>
      acc.replace(
        new RegExp(cur),
        `[${hangulRangeForReg(idx, 0, 0)}-${hangulRangeForReg(idx + 1, 0, -1)}]`,
      ),
    searchKeyword,
  );
  return new RegExp(regex);
};

const textSearchFilter = (searchKeyword: string, targetWord: string) => {
  return makeRegExp(searchKeyword).test(targetWord);
};

export default textSearchFilter;
