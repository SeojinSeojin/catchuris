import styled from 'styled-components';
import { TABLE } from '../../utils/constants/TABLE';

export const Wrapper = styled.div`
  position: absolute;
  right: calc(50vw - ${(TABLE.WIDTH * TABLE.CELL.SIZE) / 2}px - 140px);
  top: 0;
  width: 120px;
  height: 140px;
  padding: 10px;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: grey;
  text-align: center;
  color: white;
`;
