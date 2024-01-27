import { COLOR } from '@/global/constants';
import { SearchSubwayNameTypes, SubwayCode } from '@/global/types/apis/searchTypes';
/*
* 인천선 === 인천1
* 인천2호선 === 인천2
// 용인경전철 === 애버라인
// 우이신설경전철 === 우이신설
// 김포도시철도 === 김포골드
*/

/**
 * 지하철 호선명 변경
 * @param list 응답받은 지하철 검색 결과
 */
export const subwayFreshLineName = (list: SearchSubwayNameTypes['data']) => {
  return list.map((item) => {
    switch (item.stationLine) {
      case '인천선':
        return { stationName: item.stationName, stationLine: '인천1' };
      case '인천2호선':
        return { stationName: item.stationName, stationLine: '인천2' };
      case '용인경전철':
        return { stationName: item.stationName, stationLine: '애버라인' };
      case '우이신설경전철':
        return { stationName: item.stationName, stationLine: '우이신설' };
      case '김포도시철도':
        return { stationName: item.stationName, stationLine: '김포골드' };
      default:
        return item;
    }
  });
};

export const subwayLineColor = (subwayCode: SubwayCode) => {
  switch (subwayCode) {
    case 1:
      return COLOR.LINE1;
    case 2:
      return COLOR.LINE2;
    case 3:
      return COLOR.LINE3;
    case 4:
      return COLOR.LINE4;
    case 5:
      return COLOR.LINE5;
    case 6:
      return COLOR.LINE6;
    case 7:
      return COLOR.LINE7;
    case 8:
      return COLOR.LINE8;
    case 9:
      return COLOR.LINE9;
    case 101:
      return COLOR.LINEGH;
    case 104:
      return COLOR.LINEKJ;
    case 107:
      return COLOR.LINEEL;
    case 108:
      return COLOR.LINEKC;
    case 109:
      return COLOR.LINENBD;
    case 110:
      return COLOR.LINEEGB;
    case 112:
      return COLOR.LINEKK;
    case 113:
      return COLOR.LINEUS;
    case 114:
      return COLOR.LINESH;
    case 115:
      return COLOR.LINEGG;
    case 116:
      return COLOR.LINESBD;
    case 117: // 신림선
      return COLOR.LINESBD;
    default:
      return '#222';
  }
};

export const subwayLineName = (subwayCode: SubwayCode) => {
  switch (subwayCode) {
    case 1:
      return '1';
    case 2:
      return '2';
    case 3:
      return '3';
    case 4:
      return '4';
    case 5:
      return '5';
    case 6:
      return '6';
    case 7:
      return '7';
    case 8:
      return '8';
    case 9:
      return '9';
    case 101:
      return `공항\n철도`;
    case 104:
      return '경의';
    case 107:
      return `에버\n라인`;
    case 108:
      return '경춘';
    case 109:
      return '신분당';
    case 110:
      return '의정부';
    case 112:
      return '경강';
    case 113:
      return `우이\n신설`;
    case 114:
      return '서해';
    case 115:
      return `김포\n골드`;
    case 116:
      return `수인\n분당`;
    case 117:
      return '신림';
    default:
      return '';
  }
};

export const subwayNameCutting = (name: string) => {
  switch (name) {
    case '가산디지털단지':
      return '가산\n디지털단지';
    case '구로디지털단지':
      return '구로\n디지털단지';
    case '동대문역사문화공원':
      return '동대문역사\n문화공원';
    case '성신여대입구':
      return '성신여대\n입구';
    case '정부과천청사':
      return '정부과천\n청사';
    case '디지털미디어시티':
      return '디지털미디어\n시티';
    case '월드컵경기장':
      return '월드컵\n경기장';
    case '부천종합운동장':
      return '부천\n종합운동장';
    case '어린이대공원':
      return '어린이\n대공원';
    case '신대방삼거리':
      return '신대방\n삼거리';
    case '가산디지털단지':
      return '가산\n디지털단지';
    case '남한산성입구':
      return '남한산성\n입구';
    case '중앙보훈병원':
      return '중앙보훈\n병원';
    case '청라국제도시':
      return '청라\n국제도시';
    case '공항화물청사':
      return '공항화물\n청사';
    case '인천공항1터미널':
      return '인천공항\n1터미널';
    case '인천공항2터미널':
      return '인천공항\n2터미널';
    case '압구정로데오':
      return '압구정\n로데오';
    case '남동인더스파크':
      return '남동\n인더스파크';
    case '양재시민의숲':
      return '양재\n시민의숲';
    case '시청.용인대':
      return '시청.\n용인대';
    case '운동장.송담대':
      return '운동장.\n송담대';
    case '전대.에버랜드':
      return '전대.\n에버랜드';
    case '419민주묘지':
      return '419\n민주묘지';
    case '북한산보국문':
      return '북한산\n보국문';
    case '경기도청북부청사':
      return '경기도청\n북부청사';
    case '경전철의정부':
      return '경전철\n의정부';
    case '주안국가산단':
      return '주안\n국가산단';
    case '가정중앙시장':
      return '가정\n중앙시장';
    case '서부여성회관':
      return '서부\n여성회관';
    case '아시아드경기장':
      return '아시아드\n경기장';
    case '경인교대입구':
      return '경인교대\n입구';
    case '지식정보단지':
      return '지식정보\n단지';
    case '국제업무지구':
      return '국제\n업무지구';
    default:
      return name;
  }
};
