import React from 'react';
import { IcGameOver, IcRefresh } from '../common/Icons';
import { RefreshButton, Wrapper } from './style';

function GameOver({ score }: { score: number }) {
  return (
    <Wrapper>
      <IcGameOver />
      <div>Game Over</div>
      <div>{score}점을 획득하셨습니다.</div>
      <RefreshButton
        onClick={() => {
          window.location.reload();
        }}
      >
        <IcRefresh />
        <div>다시 시작하기</div>
      </RefreshButton>
    </Wrapper>
  );
}

export default GameOver;
