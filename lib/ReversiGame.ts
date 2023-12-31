// lib/ReversiGame.ts

import { Cell, Board, GameState } from '../types/GameTypes';

export class ReversiGame {
    private state: GameState;

    constructor(initialState?: GameState) {
        this.state = initialState ?? this.initializeGame();
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
        if (row < 0 || row >= this.state.board.length || col < 0 || col >= this.state.board[row].length) {
          return false;
        }
        if (this.state.board[row][col] !== Cell.Empty) {
          return false;
        }
        // すべての方向をチェックするための配列
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

        while (r >= 0 && r < this.state.board.length && c >= 0 && c < this.state.board[r].length) {
          if (this.state.board[r][c] === Cell.Empty) {
            return false;
          } else if (this.state.board[r][c] !== player) {
            hasOpponent = true;
          } else {
            return hasOpponent;
          }
          r += dr;
          c += dc;
        }

        return false; // ボードの端に到達したら反転不可
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

    public isGameOver(): boolean {
        const isBoardFull = this.state.board.every(row => row.every(cell => cell !== Cell.Empty));

        const noValidMoves = [Cell.Black, Cell.White].every(player =>
          !this.hasValidMove(player)
        );

        return isBoardFull || noValidMoves;
      }

    public hasValidMove(player: Cell): boolean {
        return this.state.board.some((row, rowIndex) =>
          row.some((cell, colIndex) => this.isValidMove(rowIndex, colIndex, player))
        );
    }

    public placeRandomStone(): void {
        let emptyCells = [];
        for (let row = 0; row < this.state.board.length; row++) {
          for (let col = 0; col < this.state.board[row].length; col++) {
            if (this.state.board[row][col] === Cell.Empty && this.isValidMove(row, col, this.state.currentPlayer)) {
              emptyCells.push({ row, col });
            }
          }
        }
        if (emptyCells.length > 0) {
          const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
          this.makeMove(randomCell.row, randomCell.col, this.state.currentPlayer);
        }
      }
}