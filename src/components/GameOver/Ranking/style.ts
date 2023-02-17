import styled from 'styled-components';

export const StRankingItem = styled.div<{ isMine: boolean }>`
  background-color: ${({ isMine }) => (isMine ? `#9D546B` : `#5c5c5c`)};
  display: flex;
  align-items: center;
  border-radius: 15px;
  padding: 8px 18px;
  gap: 14px;
  font-size: 18px;
  font-family: 'BMJUA';
  width: 100%;
  box-sizing: border-box;

  & > div:nth-child(2) {
    flex-grow: 1;
  }
  & > div:nth-child(3) {
    color: #f6bc4c;
  }
`;

export const StRetryButton = styled.button`
  border: none;
  outline: none;
  background-color: #ff4882;
  font-family: 'BMJUA';
  font-size: 17px;
  color: white;
  cursor: pointer;
  width: 180px;
  align-self: center;
  padding: 16px 0;
  border-radius: 24px;
`;

const GrayWrapper = styled.div`
  background-color: #2f2f2f;
  border-radius: 10px;
  padding: 13px 12px;
`;

export const StRankingWrapper = styled(GrayWrapper)`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StGuideWrapper = styled(GrayWrapper)`
  color: #b7b7b7;
  font-size: 12px;
  line-height: 1.2;
`;

export const Wrapper = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
`;
