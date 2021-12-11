import React, { useRef, useState } from 'react';
import { TABLE } from '../../utils/constants/TABLE';

function GameTable() {
  const [backgrounds, setBackgrounds] = useState<string[][]>(
    new Array(TABLE.HEIGHT).fill('').map(() => new Array(TABLE.WIDTH).fill(''))
  );

  const currentTarget = useRef<ActiveMarker>({
    shape: null,
    catchu: null,
    positionX: TABLE.WIDTH / 2,
    positionY: TABLE.HEIGHT,
  });

  return <div></div>;
}

export default GameTable;
