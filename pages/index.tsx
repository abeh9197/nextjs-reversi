// pages/index.tsx

import React, { useState, useEffect } from 'react';
import ReversiBoard from '../components/ReversiBoard';
import { ReversiGame } from '../lib/ReversiGame';

const Home: React.FC = () => {
  const [game, setGame] = useState(new ReversiGame());

  // ゲームの初期化
  useEffect(() => {
    setGame(new ReversiGame());
  }, []);

  return (
    <div>
      <h1>リバーシゲーム</h1>
      <ReversiBoard board={game.getGameState().board} game={game} />
    </div>
  );
};

export default Home;
