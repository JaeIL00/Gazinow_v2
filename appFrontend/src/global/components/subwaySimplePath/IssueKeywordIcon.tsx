import { IssueKeywords } from '@/global/apis/entity';
import IconAccident from '@assets/icons/path_accident.svg';
import IconCrowded from '@assets/icons/path_crowded.svg';
import IconDelayed from '@assets/icons/path_delayed.svg';
import IconEvent from '@assets/icons/path_event.svg';
import IconNaturalDisaster from '@assets/icons/path_natural_disaster.svg';
import IconProtest from '@assets/icons/path_protest.svg';
import IconConstruction from '@assets/icons/path_construction.svg';

interface IssueKeywordIconProps {
  keyword: IssueKeywords;
  color: string;
  width: number;
  height: number;
}

const IssueKeywordIcon = ({ keyword, color, width, height }: IssueKeywordIconProps) => {
  if (keyword === '공사') return <IconConstruction width={width} height={height} color={color} />;
  if (keyword === '자연재해')
    return <IconNaturalDisaster width={width} height={height} color={color} />;
  if (keyword === '연착') return <IconDelayed width={width} height={height} color={color} />;
  if (keyword === '사고') return <IconAccident width={width} height={height} color={color} />;
  if (keyword === '혼잡') return <IconCrowded width={width} height={height} color={color} />;
  if (keyword === '시위') return <IconProtest width={width} height={height} color={color} />;
  if (keyword === '행사') return <IconEvent width={width} height={height} color={color} />;
  return <></>;
};

export default IssueKeywordIcon;
