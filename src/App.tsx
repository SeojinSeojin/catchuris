import { useState } from 'react';
import styled from 'styled-components';
import GameInit from './components/GameInit';
import GameOver from './components/GameOver';
import GameTable from './components/GameTable';
import { GlobalStyle } from './styles/global';

function App() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameStart, setIsGameStart] = useState(false);

  const addScore = (score: number) => setScore((prev) => prev + score);
  const finishGame = () => setIsGameOver(true);

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {isGameOver && <GameOver score={score} />}
        {isGameStart ? (
          <GameTable
            addScore={addScore}
            score={score}
            finishGame={finishGame}
          />
        ) : (
          <GameInit startGame={() => setIsGameStart(true)} />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  height: 100vh;
`;

export default App;
