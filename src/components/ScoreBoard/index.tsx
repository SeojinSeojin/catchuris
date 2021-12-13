import React, { useEffect, useState } from 'react';
import { Score } from './style';

function ScoreBoard({ score }: { score: number }) {
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(true);
    setTimeout(() => setAnimation(false), 500);
  }, [score]);
  return (
    <Score animation={animation}>
      <div>{score}</div>
    </Score>
  );
}

export default ScoreBoard;
