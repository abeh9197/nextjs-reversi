// /components/ReversiBoard.tsx

import React from 'react';
import { Board, Cell } from '../types/GameTypes';

interface ReversiBoardProps {
  board: Board;
}

const ReversiBoard: React.FC<ReversiBoardProps> = ({ board }) => {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${board[0].length}, 50px)`,
      gridTemplateRows: `repeat(${board.length}, 50px)`,
      gap: '5px',
      justifyContent: 'center',
      margin: '20px auto',
      }}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <div key={`${rowIndex}-${colIndex}`} style={{
            width: '50px',
            height: '50px',
            backgroundColor: cell === Cell.Empty ? 'green' : (cell === Cell.Black ? 'black' : 'white'),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid black',
          }}>
          </div>
        ))
      )}
    </div>
  );
};

export default ReversiBoard;
