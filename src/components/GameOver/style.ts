import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
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
    max-width: 240px;
  }
`;

export const RankingWrapper = styled.div`
  border-radius: 8px;
  width: 300px;
  max-height: 280px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 8px;
  padding-bottom: 12px;
  background-color: #ff4882;
`;

export const RankingTitle = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  border-bottom: 1px solid white;
`;

export const RankingItem = styled.div`
  display: grid;
  grid-template-columns: 32px 160px auto;
  & div:first-child {
    text-align: center;
  }
  & > div:nth-child(2) {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SaveButton = styled.button`
  outline: none;
  border: none;
  color: #1c1c1c;
  background-color: white;
  border-radius: 24px;
  padding: 8px 16px;
  line-height: 30px;
  font-size: 16px;
`;

export const RefreshButton = styled.button`
  outline: none;
  border: none;
  background-color: #ff4882;
  border-radius: 24px;
  display: grid;
  align-items: center;
  gap: 8px;
  grid-template-columns: 24px auto;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  color: white;
`;
