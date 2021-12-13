import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Wrapper = styled.div`
  width: 100%;
  height: ${TABLE.CELL.SIZE}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & svg {
    width: 100%;
  }
`;
