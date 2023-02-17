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
  background-color: #1c1c1c;
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

export const BottomButton = styled.button`
  outline: none;
  background-color: #2f2f2f;
  border: 1px solid #858585;
  border-radius: 24px;
  padding: 13px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
  & div {
    flex-grow: 1;
  }
  & svg {
    width: inherit;
  }
`;

export const StListWrapper = styled.ul`
  background-color: #2f2f2f;
  border-radius: 5px;
  padding: 12px;
  color: #b7b7b7;
  font-size: 12px;
  line-height: 1.5;
  padding-inline-start: 24px;
  list-style-type: '- ';
  margin-block-end: 0;
  margin-block-start: 0;
`;
