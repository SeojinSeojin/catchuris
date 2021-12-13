import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Wrapper = styled.div`
  width: ${TABLE.CELL.SIZE * TABLE.WIDTH}px;
  height: ${TABLE.CELL.SIZE * TABLE.HEIGHT}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > div {
    line-height: 30px;
    font-size: 20px;
  }

  & svg {
    width: 100%;
  }
`;
