import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { LOCAL_STORAGE } from '../../../utils/constants/key';
import { useFirebase } from '../../../utils/hooks/useFirebase';
import { saveScore } from '../../../utils/score';
import { getArray } from '../../../utils/type';
import { IcGameOver, IcRefresh } from '../../common/Icons';
import InputItem from '../../Input';
import { BottomButton, StListWrapper } from '../style';

const GameResult = ({
  score,
  setRankingMode,
}: {
  score: number;
  setRankingMode: () => void;
}) => {
  const { firebaseApp } = useFirebase();
  const [userName, setUserName] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  const saveUserScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoreSaved) return;
    if (!firebaseApp) return; // 경고 띄우기
    const scoreId = uuidv4();

    saveScore(
      score,
      userName,
      scoreId
    )(firebaseApp).then(
      () => {
        // 토스트로 저장되었다고 알려주기
        setScoreSaved(true);
        const lastRankIds = getArray(
          localStorage.getItem(LOCAL_STORAGE.RANK_IDS)
        );
        localStorage.setItem(
          LOCAL_STORAGE.RANK_IDS,
          JSON.stringify([...lastRankIds, scoreId])
        );
      },
      () => {
        // 토스트로 잘못 되었다고 알려주기
        console.error('firebase request failed');
      }
    );
  };

  return (
    <div>
      <IcGameOver />
      <div>Game Over</div>
      <div>{score}점을 획득하셨습니다.</div>
      <div style={{ height: 30 }}></div>
      <InputItem
        value={userName}
        placeholder='랭킹에 표시될 이름을 입력해주세요'
        setValue={setUserName}
        onNext={saveUserScore}
        editable={!scoreSaved}
        label={scoreSaved ? '저장되었습니다.' : ''}
      />
      <div style={{ height: 14 }}></div>
      <StListWrapper>
        <li>점수를 저장하지 않으면 랭킹에 올라갈 수 없어요</li>
        <li>최종 랭킹 1위에게는 캐치미가 소정의 선물을 드려요</li>
      </StListWrapper>
      <div style={{ height: 68 }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
        <BottomButton onClick={setRankingMode}>
          <div>랭킹 보기</div>
        </BottomButton>
        <BottomButton
          onClick={() => {
            window.location.reload();
          }}
        >
          <IcRefresh />
          <div>게임 다시하기</div>
        </BottomButton>
      </div>
    </div>
  );
};

export default GameResult;
