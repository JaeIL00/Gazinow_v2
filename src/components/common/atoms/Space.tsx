import styled from '@emotion/native';

interface SpaceProps {
  width?: string;
  height?: string;
}

const Space = ({ width, height }: SpaceProps) => {
  return <SpaceComponent width={width} height={height} />;
};

export default Space;

const SpaceComponent = styled.View<SpaceProps>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
`;
