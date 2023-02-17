import score1 from '../../../../assets/image/score_1.png';
import score2 from '../../../../assets/image/score_2.png';
import score3 from '../../../../assets/image/score_3.png';
import score4 from '../../../../assets/image/score_4.png';
import score5 from '../../../../assets/image/score_5.png';
import { StRankingItem } from '../style';

const TrophyImage: Record<number, string> = {
  1: score1,
  2: score2,
  3: score3,
  4: score4,
  5: score5,
};

const RankingItem = ({
  rank,
  score,
  name,
  isMine,
}: {
  rank: number;
  score: number;
  name: string;
  isMine: boolean;
}) => {
  const trophyImage = TrophyImage[rank];
  return (
    <StRankingItem isMine={isMine}>
      <img src={trophyImage} alt={`${rank}등`} width={30} height='auto' />
      <div>{name}</div>
      <div>{score}</div>
    </StRankingItem>
  );
};

export default RankingItem;
