import React, { useEffect, useRef, useState } from 'react';
import { BLOCKS, BLOCK_COUNT } from '../../utils/constants/BLOCKS';
import { TABLE } from '../../utils/constants/TABLE';
import { rotate90 } from '../../utils/moveHandler';
import { isCrashWithTable, isInCanvas } from '../../utils/moveValidator';
import GameOver from '../GameOver';
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
  const [isGameOver, setIsGameOver] = useState(false);

  const currentTarget = useRef<ActiveMarker | null>({
    shape: BLOCKS[initialTarget].shape,
    catchu: BLOCKS[initialTarget].catchu,
    positionX: TABLE.WIDTH / 2,
    positionY: 0,
    key: initialTarget,
  });

  useEffect(() => {
    setBackgrounds((prev) => {
      const temp = [...prev];
      temp[0][0] = 'I';
      return temp;
    });
  }, []);

  useEffect(() => {
    if (isGameOver) {
      setBackgrounds(
        new Array(TABLE.HEIGHT)
          .fill('')
          .map(() => new Array(TABLE.WIDTH).fill(''))
      );
      currentTarget.current = null;
    }
  }, [isGameOver]);

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!currentTarget.current) return;
    canvas.width = TABLE.WIDTH * TABLE.CELL.SIZE;
    canvas.height = TABLE.HEIGHT * TABLE.CELL.SIZE;
    const context = canvas.getContext('2d');
    currentTarget.current.shape.forEach((position) => {
      const x =
        (position[0] + currentTarget.current!.positionX) * TABLE.CELL.SIZE;
      const y =
        (position[1] + currentTarget.current!.positionY) * TABLE.CELL.SIZE;
      context?.drawImage(
        currentTarget.current!.catchu.svg,
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
    if (!currentTarget.current) return;
    const currentPositions = currentTarget.current.shape;
    const currentX = currentTarget.current.positionX;
    const currentY = currentTarget.current.positionY;
    let nextPositions: number[][];
    if (!rotate)
      nextPositions = currentPositions.map((position) => [
        position[0] + dx + currentX,
        position[1] + dy + currentY,
      ]);
    else
      nextPositions = rotate90(currentPositions).map((position) => [
        position[0] + currentX,
        position[1] + currentY,
      ]);
    if (!currentPositions) return;
    if (
      nextPositions.filter(
        (position) =>
          !isInCanvas({
            x: position[0],
            y: position[1],
          })
      ).length +
        nextPositions
          .filter((position) =>
            isInCanvas({
              x: position[0],
              y: position[1],
            })
          )
          .filter((position) =>
            isCrashWithTable(position[0], position[1], backgrounds)
          ).length !==
      0
    ) {
      if (dy) {
        setBackgrounds((prev) => {
          const temp = [...prev];
          currentPositions.forEach((position) => {
            if (!temp[position[1] + currentY]) return;
            temp[position[1] + currentY][position[0] + currentX] =
              currentTarget.current!.key;
          });
          return temp;
        });
        const newTarget =
          Object.keys(BLOCKS)[Math.floor(Math.random() * BLOCK_COUNT)];
        currentTarget.current = {
          shape: BLOCKS[newTarget].shape,
          catchu: BLOCKS[newTarget].catchu,
          positionX: TABLE.WIDTH / 2,
          positionY: -1,
          key: newTarget,
        };
        if (
          currentPositions
            .filter((position) =>
              isInCanvas({
                x: position[0] + TABLE.WIDTH / 2,
                y: position[1] - 1,
              })
            )
            .filter((position) =>
              isCrashWithTable(
                position[0] + TABLE.WIDTH / 2,
                position[1] - 1,
                backgrounds
              )
            ).length !== 0
        )
          setIsGameOver(true);
      } else return;
    } else {
      if (!rotate) {
        currentTarget.current.positionX += dx;
        currentTarget.current.positionY += dy;
      } else {
        currentTarget.current.shape = rotate90(currentTarget.current.shape);
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
      if (!currentTarget.current) return;
      pressedKey && handleMove[pressedKey]();
    }, 100);

    const moveDown = setInterval(() => handleMove.down(), 1000);

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
      {isGameOver ? (
        <GameOver />
      ) : (
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
      )}
    </div>
  );
}

export default GameTable;
