// ReversiGame.test.ts

import { ReversiGame } from './ReversiGame';
import { Cell } from '../types/GameTypes';

describe('ReversiGame', () => {
  test('should allow a valid move', () => {
    const game = new ReversiGame();
    const isValid = game.isValidMove(2, 3, Cell.Black); // この座標とプレイヤーはテストケースに合わせて適宜変更
    expect(isValid).toBe(true);
  });

  test('should not allow a move on a non-empty cell', () => {
    const game = new ReversiGame();
    game.makeMove(3, 3, Cell.Black); // 石を置く
    const isValid = game.isValidMove(3, 3, Cell.White);
    expect(isValid).toBe(false);
  });

});