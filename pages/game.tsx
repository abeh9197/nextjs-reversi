// pages/game.tsx

import React, { useState, useEffect } from 'react';
import { Board, Cell, GameState } from '../types/GameTypes'; // 適切な型定義を利用
import { ReversiGame } from '../lib/ReversiGame'; // リバーシゲームのロジック

const GamePage: React.FC = () => {
  const [game, setGame] = useState(new ReversiGame());

  const handleCellClick = (row: number, col: number) => {
    // セルをクリックしたときの処理
    if (game.isValidMove(row, col, game.getCurrentPlayer())) {
      const newGame = new ReversiGame(game.getGameState());
      newGame.makeMove(row, col, game.getCurrentPlayer());
      setGame(newGame);
    }
  };

  // 盤面のレンダリング
  const renderBoard = (board: Board) => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((cell, colIndex) => (
          <div key={colIndex} className="cell" onClick={() => handleCellClick(rowIndex, colIndex)}>
            {/* セルの内容（石の有無など）を描画 */}
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <h1>Reversi Game</h1>
      <div className="board">{renderBoard(game.getGameState().board)}</div>
    </div>
  );
};

export default GamePage;
