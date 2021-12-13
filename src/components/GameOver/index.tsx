import React from 'react';
import { IcGameOver } from '../common/Icons';
import { Wrapper } from './style';

function GameOver({ score }: { score: number }) {
  return (
    <Wrapper>
      <IcGameOver />
      <div>Game Over</div>
      <div>{score}점을 획득하셨습니다.</div>
      <div>다시 시작하시려면 새로고침을 눌러주세요</div>
    </Wrapper>
  );
}

export default GameOver;
