// GameTypes.ts

export enum Cell {
    Empty = "EMPTY",
    Black = "BLACK",
    White = "WHITE"
}

export type Board = Cell[][];

export interface GameState {
    board: Board;
    currentPlayer: Cell.Black | Cell.White
}