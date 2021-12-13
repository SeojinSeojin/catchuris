import React, { useEffect, useRef, useState } from 'react';
import { BLOCKS, BLOCK_COUNT } from '../../utils/constants/BLOCKS';
import { TABLE } from '../../utils/constants/TABLE';
import { rotate90 } from '../../utils/moveHandler';
import { isNotMoveable } from '../../utils/moveValidator';
import { Canvas, Cell, Row } from './style';

function GameTable({
  addScore,
  finishGame,
}: {
  addScore: (score: number) => void;
  finishGame: () => void;
}) {
  const [backgrounds, setBackgrounds] = useState<string[][]>(
    new Array(TABLE.HEIGHT).fill('').map(() => new Array(TABLE.WIDTH).fill(''))
  );
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<number>(0);
  const activeCatchu = useRef<ActiveMarker | null>();

  const initializeCatchu = () => {
    const newCatchu =
      Object.keys(BLOCKS)[Math.floor(Math.random() * BLOCK_COUNT)];
    activeCatchu.current = {
      shape: BLOCKS[newCatchu].shape,
      catchu: BLOCKS[newCatchu].catchu,
      positionX: TABLE.WIDTH / 2,
      positionY: 0,
      key: newCatchu,
    };
  };

  const updateBackground = () => {
    const newBackground = backgrounds.filter(
      (row) => row.filter((cell) => cell === '').length !== 0
    );
    const deletedRows = TABLE.HEIGHT - newBackground.length;
    addScore(deletedRows * deletedRows * 100);
    setBackgrounds(
      new Array(deletedRows)
        .fill('')
        .map(() => new Array(TABLE.WIDTH).fill(''))
        .concat(newBackground)
    );
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!activeCatchu.current) return;
    canvas.width = TABLE.WIDTH * TABLE.CELL.SIZE;
    canvas.height = TABLE.HEIGHT * TABLE.CELL.SIZE;
    const context = canvas.getContext('2d');
    activeCatchu.current.shape.forEach((position) => {
      const x =
        (position[0] + activeCatchu.current!.positionX) * TABLE.CELL.SIZE;
      const y =
        (position[1] + activeCatchu.current!.positionY) * TABLE.CELL.SIZE;
      context?.drawImage(
        activeCatchu.current!.catchu.svg,
        x,
        y,
        TABLE.CELL.SIZE,
        TABLE.CELL.SIZE
      );
    });
    requestAnimationRef.current = requestAnimationFrame(render);
  };

  const handlePosition = ({
    rotate,
    dx,
    dy,
  }: {
    rotate: boolean;
    dx: number;
    dy: number;
  }) => {
    if (!activeCatchu.current) return;
    const currentPositions = activeCatchu.current.shape;
    const currentX = activeCatchu.current.positionX;
    const currentY = activeCatchu.current.positionY;
    let nextPositions = (
      rotate ? rotate90(currentPositions) : currentPositions
    ).map((position) => [
      position[0] + dx + currentX,
      position[1] + dy + currentY,
    ]);
    if (!currentPositions) return;
    if (isNotMoveable(nextPositions, backgrounds)) {
      if (dy) {
        setBackgrounds((prev) => {
          const temp = [...prev];
          currentPositions.forEach((position) => {
            if (!temp[position[1] + currentY]) return;
            temp[position[1] + currentY][position[0] + currentX] =
              activeCatchu.current!.key;
          });
          return temp;
        });
        updateBackground();
        initializeCatchu();
        const initPositions = activeCatchu.current.shape.map((position) => [
          position[0] + TABLE.WIDTH / 2,
          position[1] - 1,
        ]);
        if (isNotMoveable(initPositions, backgrounds)) {
          finishGame();
          activeCatchu.current = null;
        }
      } else return;
    } else {
      if (!rotate) {
        activeCatchu.current.positionX += dx;
        activeCatchu.current.positionY += dy;
      } else {
        activeCatchu.current.shape = rotate90(activeCatchu.current.shape);
      }
    }
  };

  const handleMove: { [key: string]: () => void } = {
    down: () => handlePosition({ rotate: false, dx: 0, dy: 1 }),
    up: () => handlePosition({ rotate: true, dx: 0, dy: 0 }),
    right: () => handlePosition({ rotate: false, dx: 1, dy: 0 }),
    left: () => handlePosition({ rotate: false, dx: -1, dy: 0 }),
  };

  useEffect(() => {
    const movePosition = setInterval(() => {
      if (!activeCatchu.current) return;
      pressedKey && handleMove[pressedKey]();
    }, 100);

    const moveDown = setInterval(() => handleMove.down(), 1000);

    return () => {
      clearInterval(movePosition);
      clearInterval(moveDown);
    };
  });

  useEffect(() => {
    initializeCatchu();
    return () => {
      activeCatchu.current = null;
    };
  }, []);

  useEffect(() => {
    requestAnimationRef.current = requestAnimationFrame(render);
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Down':
        case 'ArrowDown':
          return setPressedKey('down');
        case 'Up':
        case 'ArrowUp':
          return setPressedKey('up');
        case 'Left':
        case 'ArrowLeft':
          return setPressedKey('left');
        case 'Right':
        case 'ArrowRight':
          return setPressedKey('right');
        case 'Enter':
          return setPressedKey('enter');
      }
    };
    const cancelKeyPress = () => setPressedKey(null);
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', cancelKeyPress);
    return () => {
      cancelAnimationFrame(requestAnimationRef.current);
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', cancelKeyPress);
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
