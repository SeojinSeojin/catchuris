import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
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
    max-width: 400px;
  }
`;

export const RefreshButton = styled.div`
  background-color: #ff4882;
  border-radius: 24px;
  display: grid;
  align-items: center;
  gap: 8px;
  grid-template-columns: 24px auto;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 14px;
`;
