import styled from 'styled-components';

interface IScore {
  animation: boolean;
}

export const Score = styled.div<IScore>`
  padding: 10px;
  background-color: #2f2f2f;
  border-bottom-right-radius: 20px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;

  & div {
    font-size: 20px;
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
