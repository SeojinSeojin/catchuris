import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

interface IScore {
  animation: boolean;
}

export const Score = styled.div<IScore>`
  position: absolute;
  right: calc(50vw - ${(TABLE.WIDTH * TABLE.CELL.SIZE) / 2}px - 140px);
  top: 180px;
  width: 120px;
  padding: 10px;
  background-color: grey;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  color: white;

  & div {
    ${({ animation }) =>
      animation ? 'animation: 0.5s linear scaleInOut;' : ''}
  }

  @keyframes scaleInOut {
    0% {
      transform: scale(100%);
    }
    50% {
      transform: scale(110%);
    }
    100% {
      transform: scale(100%);
    }
  }
`;
