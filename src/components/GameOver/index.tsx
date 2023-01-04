import { cloneDeep, sortedIndexBy } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { useFirebase } from '../../utils/hooks/useFirebase';
import { getScores, saveScore } from '../../utils/score';
import { IcGameOver, IcRefresh } from '../common/Icons';
import InputItem from '../Input';
import {
  RankingItem,
  RankingTitle,
  RankingWrapper,
  RefreshButton,
  Wrapper,
} from './style';

function GameOver({ score }: { score: number }) {
  const { firebaseApp } = useFirebase();
  const [scores, setScores] = useState<{ score: number; name: string }[]>([]);
  const [userName, setUserName] = useState('');
  const [scoreSaved, setScoreSaved] = useState(false);

  useEffect(() => {
    if (firebaseApp) {
      getScores()(firebaseApp).then((serverScores) => {
        setScores(serverScores);
      });
    }
  }, [firebaseApp]);

  const saveUserScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (scoreSaved) return;
    if (!firebaseApp) return; // 경고 띄우기

    saveScore(
      score,
      userName
    )(firebaseApp).then(
      () => {
        // 토스트로 저장되었다고 알려주기
        setScoreSaved(true);
      },
      () => {
        // 토스트로 잘못 되었다고 알려주기
      }
    );
  };

  const rank = useMemo(
    () =>
      scores.length +
      1 -
      sortedIndexBy(
        cloneDeep(scores)
          .reverse()
          .map((s) => s.score),
        score
      ),
    [score, scores]
  );

  return (
    <Wrapper>
      <IcGameOver />
      <div>Game Over</div>
      <div>
        {score}점을 획득하셨습니다. (순위:{rank})
      </div>
      {scoreSaved ? (
        <div style={{ height: 44 }}>점수가 저장되었습니다!</div>
      ) : (
        <InputItem
          value={userName}
          placeholder='랭킹에 표시될 이름을 입력해주세요'
          setValue={setUserName}
          onNext={saveUserScore}
        />
      )}
      <RankingWrapper>
        <RankingTitle>랭킹</RankingTitle>
        {scores
          .slice(0, 5)
          .map(({ score: otherScore, name: otherName }, index) => (
            <RankingItem key={index}>
              <div>{index + 1}</div>
              <div>{otherName}</div>
              <div>{otherScore}</div>
            </RankingItem>
          ))}
      </RankingWrapper>
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
