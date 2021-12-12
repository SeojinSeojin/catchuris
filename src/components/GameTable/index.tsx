import React, { useEffect, useRef, useState } from 'react';
import { BLOCKS, BLOCK_COUNT } from '../../utils/constants/BLOCKS';
import { TABLE } from '../../utils/constants/TABLE';

function GameTable() {
  const initialTarget =
    Object.keys(BLOCKS)[Math.floor(Math.random() * BLOCK_COUNT)];
  const [backgrounds, setBackgrounds] = useState<string[][]>(
    new Array(TABLE.HEIGHT).fill('').map(() => new Array(TABLE.WIDTH).fill(''))
  );

  const currentTarget = useRef<ActiveMarker>({
    shape: BLOCKS[initialTarget].shape,
    catchu: BLOCKS[initialTarget].catchu,
    positionX: TABLE.WIDTH / 2,
    positionY: TABLE.HEIGHT,
  });

  useEffect(() => {
    setBackgrounds((prev) => {
      const temp = [...prev];
      temp[0][0] = 'I';
      return temp;
    });
  }, []);

  return (
    <div>
      <div>
        {backgrounds.map((row, ridx) => (
          <div key={ridx}>
            {row.map((cell, cidx) => (
              <div key={cidx}>{cell !== '' && BLOCKS[cell].catchu()}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameTable;
