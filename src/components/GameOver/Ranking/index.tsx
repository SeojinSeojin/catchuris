import { useEffect, useRef, useState } from 'react';
import imgGameRanking from '../../../assets/image/game-ranking.png';
import { LOCAL_STORAGE } from '../../../utils/constants/key';
import { useFirebase } from '../../../utils/hooks/useFirebase';
import { getScores } from '../../../utils/score';
import { getArray } from '../../../utils/type';
import RankingItem from './Item';
import {
  StGuideWrapper,
  StRankingWrapper,
  StRetryButton,
  Wrapper,
} from './style';

const GameRanking = () => {
  const { firebaseApp } = useFirebase();
  const [scores, setScores] = useState<
    { score: number; name: string; uniqueId: string }[]
  >([]);

  const myPrevScoreIdRef = useRef(
    getArray(localStorage.getItem(LOCAL_STORAGE.RANK_IDS))
  );

  useEffect(() => {
    if (firebaseApp) {
      getScores()(firebaseApp).then((serverScores) => {
        setScores(serverScores);
      });
    }
  }, [firebaseApp]);

  return (
    <Wrapper>
      <img src={imgGameRanking} width={293} alt='ranking' />
      <StRankingWrapper>
        {scores.slice(0, 5).map(({ score, name, uniqueId }, index) => (
          <RankingItem
            key={index}
            rank={index + 1}
            name={name}
            score={score}
            isMine={myPrevScoreIdRef.current.includes(uniqueId)}
          />
        ))}
      </StRankingWrapper>
      <div style={{ height: 16 }}></div>
      <StGuideWrapper>
        1등 인증 방법 : 현재 화면을 캡쳐 후 <br />
        @catchme.universe를 태그해 인스타그램 스토리에 올린다!
      </StGuideWrapper>
      <div style={{ height: 16 }}></div>
      <StRetryButton
        onClick={() => {
          window.location.reload();
        }}
      >
        다시하기
      </StRetryButton>
    </Wrapper>
  );
};

export default GameRanking;
