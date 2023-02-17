import styled from 'styled-components';
import { ImageCatchues, ImageLogo } from '../common/Icons';

function GameInit({ startGame }: { startGame: () => void }) {
  return (
    <Wrapper>
      <ImageLogo />
      <div>나의 매일을 다채롭게, 캐치미</div>
      <ImageCatchues />
      <ButtonWrapper>
        <Button onClick={startGame}>캐츄리스 시작하기</Button>
        <Button
          onClick={() =>
            window.location.replace('https://catchme-promotion.netlify.app/')
          }
        >
          프로모션 홈 돌아가기
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`;

const ButtonWrapper = styled.div`
  margin-top: 36px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Button = styled.div`
  background-color: #ea4579;
  border-radius: 25px;
  text-align: center;
  font-size: 14px;
  padding: 16px 34.5px;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
`;

export default GameInit;
