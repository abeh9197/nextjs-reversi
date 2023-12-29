// pages/index.tsx

import React, { useState, useEffect } from 'react';
import ReversiBoard from '../components/ReversiBoard';
import { ReversiGame } from '../lib/ReversiGame';
import { Cell } from '../types/GameTypes';

const Home: React.FC = () => {
  const [game, setGame] = useState(new ReversiGame());

  useEffect(() => {
    setGame(new ReversiGame());
  }, []);

  const handleMove = (row: number, col: number) => {
    // ゲームの状態を更新するロジック
    // 例: game.makeMove(row, col);
    setGame({ ...game }); // ステートを更新してリレンダリングをトリガー
  };

  return (
    <div>
      <h1>現在のプレイヤー: {game.getCurrentPlayer() === Cell.Black ? '黒' : '白'}</h1>
      <ReversiBoard board={game.getGameState().board} game={game} onMove={handleMove} />
    </div>
  );
};

export default Home;
