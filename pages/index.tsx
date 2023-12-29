// /pages/index.tsx

import React, { useEffect, useState } from 'react';
import ReversiBoard from '@/components/ReversiBoard';
import { ReversiGame } from '@/lib/ReversiGame';

const Home: React.FC = () => {
    const [game, setGame] = useState(new ReversiGame());

    useEffect(() => {
        setGame(new ReversiGame());
    }, []);

    return (
        <div>
            <h1>リバーシゲーム</h1>
            <ReversiBoard board={game.getGameState().board} />
        </div>
    );
};

export default Home;