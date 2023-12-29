// components/ReversiBoard.tsx

import React, { useState, memo } from 'react';
import { Board, Cell } from '../types/GameTypes';
import { ReversiGame } from '../lib/ReversiGame';
import styles from '../styles/ReversiBoard.module.css'; // CSSモジュールをインポート

interface ReversiBoardProps {
  board: Board;
  game: ReversiGame;
  onMove: (row: number, col: number) => void;
}

const ReversiBoard: React.FC<ReversiBoardProps> = memo(({ board, game, onMove }) => {
  const [highlightedCell, setHighlightedCell] = useState<[number, number] | null>(null);

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

  return (
    <div style={{ 
        display: 'grid', 
        gridTemplateColumns: `repeat(${board.length}, 50px)`, 
        gridTemplateRows: `repeat(${board.length}, 50px)`,
        gap: '5px', 
        justifyContent: 'center', 
        margin: '20px auto' 
    }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const isHighlighted = highlightedCell && highlightedCell[0] === rowIndex && highlightedCell[1] === colIndex;
          return (
            <div 
              key={`${rowIndex}-${colIndex}`} 
              style={{ 
                width: '50px', 
                height: '50px', 
                backgroundColor: isHighlighted ? 'lightblue' : 'green',
                border: '1px solid black',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick(rowIndex, colIndex)}
            >
              {cell !== Cell.Empty && <div className={styles.stone} style={getStoneStyle(cell)}></div>}
            </div>
          );
        })
      )}
    </div>
  );
});

export default ReversiBoard;
