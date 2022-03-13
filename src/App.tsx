import React, { useState } from 'react';
import styled from 'styled-components';
import GameOver from './components/GameOver';
import GameTable from './components/GameTable';

function App() {
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  const addScore = (score: number) => setScore((prev) => prev + score);
  const finishGame = () => setIsGameOver(true);

  return (
    <Wrapper>
      {isGameOver && <GameOver score={score} />}
      <GameTable addScore={addScore} score={score} finishGame={finishGame} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export default App;
