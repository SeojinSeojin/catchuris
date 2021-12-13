import React from 'react';
import { IcGameOver } from '../common/Icons';
import { Wrapper } from './style';

function GameOver() {
  return (
    <Wrapper>
      <IcGameOver />
      <div>다시 시작하시려면 새로고침을 눌러주세요</div>
    </Wrapper>
  );
}

export default GameOver;
