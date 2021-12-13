import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Wrapper = styled.div`
  width: ${TABLE.CELL.SIZE * TABLE.WIDTH}px;
  height: ${TABLE.CELL.SIZE * TABLE.HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 999;
  animation: 0.5s linear fadeIn;
  backdrop-filter: grayscale(30%);

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(110%);
    }
    to {
      opacity: 1;
      transform: scale(100%);
    }
  }

  & > div {
    line-height: 30px;
    font-size: 20px;
    color: white;
  }

  & svg {
    width: 100%;
  }
`;
