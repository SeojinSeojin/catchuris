import { useState } from 'react';
import GameRanking from './Ranking';
import GameResult from './Result';
import { Wrapper } from './style';

function GameOver({ score }: { score: number }) {
  const [displayMode, setDisplayMode] = useState<'RESULT' | 'RANKING'>(
    'RESULT'
  );

  const setRankingMode = () => setDisplayMode('RANKING');

  return (
    <Wrapper>
      {displayMode === 'RESULT' ? (
        <GameResult score={score} setRankingMode={setRankingMode} />
      ) : (
        <GameRanking />
      )}
    </Wrapper>
  );
}

export default GameOver;
