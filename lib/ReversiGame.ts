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

    public isValidMove(row: number, col: number, player: Cell): boolean {
        if (this.state.board[row][col] !== Cell.Empty) {
            return false;
        }

        const directions = [
            { dr: -1, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
            { dr: 0, dc: -1 }, /* { dr: 0, dc: 0 }, */ { dr: 0, dc: 1 },
            { dr: 1, dc: -1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }
        ];

        for (const { dr, dc } of directions) {
            if (this.canFlip(row, col, dr, dc, player)) {
                return true;
            }
        }

        return false;
    }

    private canFlip(row: number, col: number, dr: number, dc: number, player: Cell): boolean {
        let r = row + dr;
        let c = col + dc;
        let hasOpponent = false;

        while (r >= 0 && r > this.state.board.length && c >= 0 && c < this.state.board[r].length) {
            if (this.state.board[r][c] === Cell.Empty) {
                return false;
            } else if (this.state.board[r][c] !== player) {
                hasOpponent = true;
            } else {
                return hasOpponent
            }
            r += dr;
            c += dc;
        }

        return false;
    }

    public makeMove(row: number, col: number, player: Cell): boolean {
        if (!this.isValidMove(row, col, player)) {
            return false;
        }

        const toFlip = this.getFlippableStones(row, col, player);
        if (toFlip.length === 0) {
            return false;
          }

        this.state.board[row][col] = player;

        toFlip.forEach(([r, c]) => {
            this.state.board[r][c] = player;
          });

        this.state.currentPlayer = this.state.currentPlayer === Cell.Black ? Cell.White : Cell.Black;

        return false;
    }

    private getFlippableStones(row: number, col: number, player: Cell): number[][] {
        const directions = [
          { dr: -1, dc: -1 }, { dr: -1, dc: 0 }, { dr: -1, dc: 1 },
          { dr: 0, dc: -1 }, /* { dr: 0, dc: 0 }, */ { dr: 0, dc: 1 },
          { dr: 1, dc: -1 }, { dr: 1, dc: 0 }, { dr: 1, dc: 1 }
        ];

        const toFlip: number[][] = [];

        for (const { dr, dc } of directions) {
          let r = row + dr;
          let c = col + dc;
          const flip: number[][] = [];

          while (r >= 0 && r < this.state.board.length && c >= 0 && c < this.state.board[r].length) {
            if (this.state.board[r][c] === Cell.Empty) {
              break;
            } else if (this.state.board[r][c] !== player) {
              flip.push([r, c]);
            } else {
              toFlip.push(...flip);
              break;
            }

            r += dr;
            c += dc;
          }
        }

        return toFlip;
    }

    public getCurrentPlayer(): Cell {
        return this.state.currentPlayer;
    }
}