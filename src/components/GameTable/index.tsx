import React, { useEffect, useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BLOCKS, BLOCK_COUNT } from '../../utils/constants/BLOCKS';
import { TABLE } from '../../utils/constants/TABLE';
import { rotate90 } from '../../utils/moveHandler';
import { isNotMoveable } from '../../utils/moveValidator';
import {
  IcArrowDown,
  IcArrowLeft,
  IcArrowRight,
  IcDown,
  IcRotate,
  IcSave,
} from '../common/Icons';
import SavedCatchu from '../SavedCatchu';
import ScoreBoard from '../ScoreBoard';
import {
  Canvas,
  Cell,
  Row,
  BoardWrapper,
  ButtonWrapper,
  CanvasWrapper,
} from './style';

function GameTable({
  addScore,
  finishGame,
  score,
}: {
  addScore: (score: number) => void;
  finishGame: () => void;
  score: number;
}) {
  const isBigScreen = useMediaQuery({ query: '(min-width: 500px)' });
  const [backgrounds, setBackgrounds] = useState<string[][]>(
    new Array(TABLE.HEIGHT).fill('').map(() => new Array(TABLE.WIDTH).fill(''))
  );
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestAnimationRef = useRef<number>(0);
  const activeCatchu = useRef<ActiveMarker | null>();
  const savedCatchu = useRef<Marker | null>(null);
  const isCatchuSavable = useRef<boolean>(true);
  const [calculating, setCalculating] = useState(false);
  const initialPosition = { positionX: TABLE.WIDTH / 2, positionY: -3 };

  const initializeCatchu = () => {
    const newCatchu =
      Object.keys(BLOCKS)[Math.floor(Math.random() * BLOCK_COUNT)];
    activeCatchu.current = {
      shape: BLOCKS[newCatchu].shape,
      catchu: BLOCKS[newCatchu].catchu,
      ...initialPosition,
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

  const handleNewCatchu = () => {
    if (!activeCatchu.current) return;
    const initPositions = activeCatchu.current.shape.map((position) => [
      position[0] + initialPosition.positionX,
      position[1] + initialPosition.positionY,
    ]);
    if (isNotMoveable(initPositions, backgrounds)) {
      setBackgrounds((prev) => {
        const temp = [...prev];
        activeCatchu.current!.shape.forEach((position) => {
          if (!temp[position[1] + activeCatchu.current!.positionY]) return;
          temp[position[1] + activeCatchu.current!.positionY][
            position[0] + activeCatchu.current!.positionX
          ] = activeCatchu.current!.key;
        });
        return temp;
      });
      finishGame();
      activeCatchu.current = null;
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!activeCatchu.current) return;
    canvas.width = TABLE.WIDTH * TABLE.CELL.SIZE(isBigScreen);
    canvas.height = TABLE.HEIGHT * TABLE.CELL.SIZE(isBigScreen);
    const context = canvas.getContext('2d');
    activeCatchu.current.shape.forEach((position) => {
      const x =
        (position[0] + activeCatchu.current!.positionX) *
        TABLE.CELL.SIZE(isBigScreen);
      const y =
        (position[1] + activeCatchu.current!.positionY) *
        TABLE.CELL.SIZE(isBigScreen);
      context?.drawImage(
        activeCatchu.current!.catchu.svg,
        x,
        y,
        TABLE.CELL.SIZE(isBigScreen),
        TABLE.CELL.SIZE(isBigScreen)
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
    setCalculating(true);
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
        handleNewCatchu();
        isCatchuSavable.current = true;
        setCalculating(false);
      } else return setCalculating(false);
    } else {
      if (!rotate) {
        activeCatchu.current.positionX += dx;
        activeCatchu.current.positionY += dy;
      } else {
        activeCatchu.current.shape = rotate90(activeCatchu.current.shape);
      }
      setCalculating(false);
    }
  };

  const moveGround = () => {
    if (!activeCatchu.current) return;
    setCalculating(true);
    const currentX = activeCatchu.current.positionX;
    const currentY = activeCatchu.current.positionY;
    let flag = true;
    let dy = 0;
    while (flag && dy <= TABLE.HEIGHT - currentY) {
      const nextPositions = activeCatchu.current.shape.map((position) => [
        position[0] + currentX,
        position[1] + dy + currentY,
      ]);
      if (!isNotMoveable(nextPositions, backgrounds)) {
        dy += 1;
      } else {
        flag = false;
      }
    }
    handlePosition({ rotate: false, dx: 0, dy: dy - 1 });
  };

  const saveCatchu = () => {
    if (!isCatchuSavable.current) return;
    if (!activeCatchu.current) return;
    isCatchuSavable.current = false;
    if (!savedCatchu.current) {
      savedCatchu.current = { ...activeCatchu.current };
      initializeCatchu();
      handleNewCatchu();
    } else {
      const tempSavedCatchu = { ...savedCatchu.current };
      savedCatchu.current = { ...activeCatchu.current };
      activeCatchu.current = {
        ...tempSavedCatchu,
        ...initialPosition,
      };
      handleNewCatchu();
    }
  };

  const handleMove: { [key: string]: () => void } = {
    down: () => handlePosition({ rotate: false, dx: 0, dy: 1 }),
    up: () => handlePosition({ rotate: true, dx: 0, dy: 0 }),
    right: () => handlePosition({ rotate: false, dx: 1, dy: 0 }),
    left: () => handlePosition({ rotate: false, dx: -1, dy: 0 }),
    enter: () => moveGround(),
    space: () => saveCatchu(),
  };

  useEffect(() => {
    const movePosition = setInterval(() => {
      if (!activeCatchu.current) return;
      pressedKey && handleMove[pressedKey]();
    }, 80);

    return () => {
      clearInterval(movePosition);
    };
  });

  useEffect(() => {
    if (calculating) return;
    const moveDown = setInterval(() => handleMove.down(), 500);

    return () => {
      clearInterval(moveDown);
    };
  }, [calculating]);

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
        case ' ':
        case 'Spacebar':
          return setPressedKey('space');
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
      <CanvasWrapper>
        <Canvas ref={canvasRef} />
        {backgrounds.map((row, ridx) => (
          <Row key={ridx} isBigScreen={isBigScreen}>
            {row.map((cell, cidx) => (
              <Cell key={cidx} isBigScreen={isBigScreen}>
                {cell !== '' && BLOCKS[cell].catchu.component()}
              </Cell>
            ))}
          </Row>
        ))}
      </CanvasWrapper>
      <BoardWrapper>
        <SavedCatchu catchu={savedCatchu.current} />
        <ScoreBoard score={score} />
      </BoardWrapper>
      {!isBigScreen && (
        <ButtonWrapper>
          <IcArrowLeft
            onTouchStart={() => setPressedKey('left')}
            onTouchEnd={() => setPressedKey(null)}
          />
          <IcArrowDown
            onTouchStart={() => setPressedKey('down')}
            onTouchEnd={() => setPressedKey(null)}
          />
          <IcArrowRight
            onTouchStart={() => setPressedKey('right')}
            onTouchEnd={() => setPressedKey(null)}
          />
          <IcDown
            onTouchStart={() => setPressedKey('enter')}
            onTouchEnd={() => setPressedKey(null)}
          />
          <IcRotate
            onTouchStart={() => setPressedKey('up')}
            onTouchEnd={() => setPressedKey(null)}
          />
          <IcSave
            onTouchStart={() => setPressedKey('space')}
            onTouchEnd={() => setPressedKey(null)}
          />
        </ButtonWrapper>
      )}
    </div>
  );
}

export default GameTable;
