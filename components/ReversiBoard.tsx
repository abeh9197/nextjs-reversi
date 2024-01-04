// components/ReversiBoard.tsx

import React, { useEffect, useState, memo } from 'react';
import { Board, Cell } from '../types/GameTypes';
import { ReversiGame } from '../lib/ReversiGame';
import styles from '../styles/ReversiBoard.module.css';

interface ReversiBoardProps {
  board: Board;
  game: ReversiGame;
  onMove: (row: number, col: number) => void;
}

const ReversiBoard: React.FC<ReversiBoardProps> = memo(({ board, game, onMove }) => {
  const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null);
  const [previousBoard, setPreviousBoard] = useState<Board>(board);
  const [boardState, setBoardState] = useState<Board>(game.getGameState().board);

useEffect(() => {
  const handleBoardChange = () => {
    setBoardState(game.getGameState().board);
  };

  game.setOnBoardChange(handleBoardChange);

  return () => game.setOnBoardChange(null);
}, [game]);

  const handleMouseEnter = (row: number, col: number) => {
    if (game.isValidMove(row, col, game.getCurrentPlayer())) {
      setHighlightedCell([row, col]);
    }
  };

  const handleMouseLeave = () => {
    setHighlightedCell(null);
  };

  const handleClick = (row: number, col: number) => {
    if (game.isValidMove(row, col, game.getCurrentPlayer())) {
      onMove(row, col);
    }
  };

  const getStoneStyle = (cell: Cell) => {
    return {
      width: '80%',
      height: '80%',
      borderRadius: '50%',
      backgroundColor: cell === Cell.Black ? 'black' : 'white',
    };
  };

  const getStoneClasses = (cell: Cell, rowIndex: number, colIndex: number) => {
    let classes = styles.stone;
    if (cell !== Cell.Empty && previousBoard[rowIndex][colIndex] !== Cell.Empty && cell !== previousBoard[rowIndex][colIndex]) {
      classes += ` ${styles.flip}`;
    }
    return classes;
  };

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (!game.hasValidMove(game.getCurrentPlayer())) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000); // 2秒後に非表示
    }
  }, [game, board]);

  const showTestPass = () => {
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000); // 2秒後に非表示
  };

  const updateBoard = () => {
    setBoardState(game.getGameState().board);
  };

  const handleAutoPlay = () => {
    const intervalId = setInterval(() => {
      game.placeRandomStone();
      if (game.isGameOver()) {
        clearInterval(intervalId);
      }
    }, 10);
  };

  useEffect(() => {
    if (game.isGameOver()) {
      const { black, white } = game.countStones();
      const winner = black > white ? "黒の勝利！" : white > black ? "白の勝利！" : "引き分け！";
      alert(`ゲーム終了！\n\n黒: ${black} 白: ${white}\n\n${winner}`);
    }
  }, [game, board]);

  const handleResetGame = () => {
    game.resetGame();
    setBoardState(game.getGameState().board);
  };

  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardState.length}, 50px)`,
        gridTemplateRows: `repeat(${boardState.length}, 50px)`,
        gap: '5px',
        justifyContent: 'center',
        margin: '20px auto'
    }}>
      <div className={styles.buttonContainer}>
        <button onClick={handleResetGame}>ゲームをリセット</button>
        <button className={styles.button} onClick={handleAutoPlay}>自動プレイ開始</button>
        <button className={styles.button} onClick={showTestPass}>（テスト用）パスボタン表示</button>
      </div>
      {showPopup && <div className={styles.popup + (showPopup ? ` ${styles.show}` : '')}>
        パス！
      </div>}
      {boardState.map((row, rowIndex) => (
        row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: highlightedCell && highlightedCell[0] === rowIndex && highlightedCell[1] === colIndex ? 'lightblue' : 'green',
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {cell !== Cell.Empty && (
              <div className={getStoneClasses(cell, rowIndex, colIndex)} style={getStoneStyle(cell)}></div>
            )}
          </div>
        ))
      ))}
    </div>
  );
});

export default ReversiBoard;
