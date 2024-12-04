const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const DIR = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DIAGONAL_UP_LEFT: 'DIAGONAL_UP_LEFT',
  DIAGONAL_UP_RIGHT: 'DIAGONAL_UP_RIGHT',
  DIAGONAL_DOWN_LEFT: 'DIAGONAL_DOWN_LEFT',
  DIAGONAL_DOWN_RIGHT: 'DIAGONAL_DOWN_RIGHT',
};

const findWord = (word, grid, i, j, dir) => {
  let wordParts = word.split('');
  for (let k = 0; k < wordParts.length; k++) {
    if (dir === DIR.UP) {
      if (grid[i - k][j] !== wordParts[k]) {
        console.log('UP', i, j, k, wordParts[k]);
        return 0;
      }
    } else if (dir === DIR.DOWN) {
      if (grid[i + k][j] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.LEFT) {
      if (grid[i][j - k] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.RIGHT) {
      if (grid[i][j + k] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.DIAGONAL_UP_LEFT) {
      if (grid[i - k][j - k] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.DIAGONAL_UP_RIGHT) {
      if (grid[i - k][j + k] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.DIAGONAL_DOWN_LEFT) {
      console.log('here');
      if (grid[i + k][j - k] !== wordParts[k]) {
        return 0;
      }
    } else if (dir === DIR.DIAGONAL_DOWN_RIGHT) {
      if (grid[i + k][j + k] !== wordParts[k]) {
        return 0;
      }
    }
  }
  return 1;
};

const solution_part1 = (input) => {
  const rows = input.toUpperCase().split('\n');
  let ret = 0;
  let cols = [];
  const grid = [];
  rows.forEach((row) => {
    grid.push(row.split(''));
  });
  const FIND_LETTER = 'X';
  const FIND_WORD = 'XMAS';

  // when i find an x look in all directions
  // Rows
  for (let i = 0; i < grid.length; i++) {
    // Cols
    for (let j = 0; j < grid[i].length; j++) {
      console.log(i, j, grid[i][j]);
      if (grid[i][j] !== FIND_LETTER) {
        console.log('continue');
        continue;
      }
      // check all directions
      // up
      if (i >= 3) {
        console.log('UP', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.UP);
      }
      // down
      if (i < grid.length - 3) {
        console.log('DOWN', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.DOWN);
      }
      // left
      if (j >= 3) {
        console.log('LEFT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.LEFT);
      }
      // right
      if (j < grid[0].length - 3) {
        console.log('RIGHT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.RIGHT);
      }
      // diagonal up left
      if (i >= 3 && j >= 3) {
        console.log('DIAGONAL_UP_LEFT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.DIAGONAL_UP_LEFT);
      }
      // diagonal up right
      if (i >= 3 && j < grid[0].length - 3) {
        console.log('DIAGONAL_UP_RIGHT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.DIAGONAL_UP_RIGHT);
      }
      // diagonal down left
      if (i < grid.length - 3 && j >= 3) {
        console.log('DIAGONAL_DOWN_LEFT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.DIAGONAL_DOWN_LEFT);
      }
      // diagonal down right
      console.log(i, j, grid.length, grid[0].length, grid.length - 3, grid[0].length - 3);
      if (i < grid.length - 3 && j < grid[0].length - 3) {
        console.log('DIAGONAL_DOWN_RIGHT', i, j);
        ret += findWord(FIND_WORD, grid, i, j, DIR.DIAGONAL_DOWN_RIGHT);
      }
    }
  }

  return ret;
};

const isXmas = (grid, i, j) => {
  let tLeft = grid[i - 1][j - 1];
  let tRight = grid[i - 1][j + 1];
  let bLeft = grid[i + 1][j - 1];
  let bRight = grid[i + 1][j + 1];
  if (i === 1 && j == 2) {
    console.log('asdfasdf', tLeft, tRight, bLeft, bRight);
  }

  if ((tLeft === 'M' && bRight === 'S') || (tLeft === 'S' && bRight === 'M')) {
    if (i === 1 && j == 2) {
      console.log('------XMAS hehere', i, j);
    }
    if ((tRight === 'M' && bLeft === 'S') || (tRight === 'S' && bLeft === 'M')) {
      console.log('------XMAS', i, j);
      return 1;
    }
  }
  return 0;
};

const solution_part2 = (input) => {
  const rows = input.toUpperCase().split('\n');
  let ret = 0;
  let cols = [];
  const grid = [];
  rows.forEach((row) => {
    grid.push(row.split(''));
  });
  const FIND_LETTER = 'A';

  // when i find an x look in all directions
  // Rows
  for (let i = 1; i < grid.length - 1; i++) {
    // Cols
    for (let j = 1; j < grid[i].length - 1; j++) {
      console.log(i, j, grid[i][j]);
      if (grid[i][j] !== FIND_LETTER) {
        console.log('continue');
        continue;
      }
      ret += isXmas(grid, i, j);
    }
  }

  return ret;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));
