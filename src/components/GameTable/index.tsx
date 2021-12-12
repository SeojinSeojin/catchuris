import React, { useEffect, useRef, useState } from 'react';
import { BLOCKS, BLOCK_COUNT } from '../../utils/constants/BLOCKS';
import { TABLE } from '../../utils/constants/TABLE';
import { rotate90 } from '../../utils/moveHandler';
import { Canvas, Cell, Row } from './style';

function GameTable() {
  const initialTarget =
    Object.keys(BLOCKS)[Math.floor(Math.random() * BLOCK_COUNT)];
  const [backgrounds, setBackgrounds] = useState<string[][]>(
    new Array(TABLE.HEIGHT).fill('').map(() => new Array(TABLE.WIDTH).fill(''))
  );
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<number>(0);

  const currentTarget = useRef<ActiveMarker>({
    shape: BLOCKS[initialTarget].shape,
    catchu: BLOCKS[initialTarget].catchu,
    positionX: TABLE.WIDTH / 2,
    positionY: 0,
  });

  useEffect(() => {
    setBackgrounds((prev) => {
      const temp = [...prev];
      temp[0][0] = 'I';
      return temp;
    });
  }, []);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!currentTarget.current) return;
    canvas.width = TABLE.WIDTH * TABLE.CELL.SIZE;
    canvas.height = TABLE.HEIGHT * TABLE.CELL.SIZE;
    const context = canvas.getContext('2d');
    currentTarget.current.shape!.forEach((position) => {
      const x =
        (position[0] + currentTarget.current.positionX) * TABLE.CELL.SIZE;
      const y =
        (position[1] + currentTarget.current.positionY) * TABLE.CELL.SIZE;
      context?.drawImage(
        currentTarget.current.catchu.svg,
        x,
        y,
        TABLE.CELL.SIZE,
        TABLE.CELL.SIZE
      );
    });
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  useEffect(() => {
    const movePosition = setInterval(() => {
      if (!currentTarget.current) return;
      switch (pressedKey) {
        case 'down':
          return (currentTarget.current.positionY += 1);
        case 'up':
          return (currentTarget.current.shape = rotate90(
            currentTarget.current.shape
          ));
        case 'right':
          return (currentTarget.current.positionX += 1);
        case 'left':
          return (currentTarget.current.positionX -= 1);
      }
    }, 100);

    const moveDown = setInterval(() => {
      currentTarget.current.positionY += 1;
    }, 1000);

    return () => {
      clearInterval(movePosition);
      clearInterval(moveDown);
    };
  });

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'Down':
        case 'ArrowDown':
          return setPressedKey('down');
        case 'Up': // IE/Edge specific value
        case 'ArrowUp':
          return setPressedKey('up');
        case 'Left': // IE/Edge specific value
        case 'ArrowLeft':
          return setPressedKey('left');
        case 'Right': // IE/Edge specific value
        case 'ArrowRight':
          return setPressedKey('right');
        case 'Enter':
          return setPressedKey('enter');
      }
    });
    window.addEventListener('keyup', () => setPressedKey(null));
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
    };
  });

  return (
    <div>
      <div>
        <Canvas ref={canvasRef} />
        {backgrounds.map((row, ridx) => (
          <Row key={ridx}>
            {row.map((cell, cidx) => (
              <Cell key={cidx}>
                {cell !== '' && BLOCKS[cell].catchu.component()}
              </Cell>
            ))}
          </Row>
        ))}
      </div>
    </div>
  );
}

export default GameTable;
