// ReversiGame.ts

import { Cell, Board, GameState } from '../types/GameTypes'

export class ReversiGame {
    private state: GameState;

    constructor() {
        this.state = this.initializeGame();
    }

    private initializeGame(): GameState {
        const board: Board = Array(8).fill(null).map(() => Array(8).fill(Cell.Empty));

        board[3][3] = Cell.White;
        board[4][4] = Cell.White;
        board[3][4] = Cell.Black;
        board[4][3] = Cell.Black;

        return {
            board: board,
            currentPlayer: Cell.Black
        };
    }

    public getGameState(): GameState {
        return this.state;
    }
}