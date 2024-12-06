const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const DIR = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};

const DIR_SYMBOLS = {
  UP: '^',
  DOWN: 'v',
  LEFT: '<',
  RIGHT: '>',
};

const steps = {
  UP: (row, col) => [row - 1, col],
  DOWN: (row, col) => [row + 1, col],
  LEFT: (row, col) => [row, col - 1],
  RIGHT: (row, col) => [row, col + 1],
};
const OBSTACLE = '#';

const stepForward = (map, row, col, direction) => {
  const [newRow, newCol] = steps[direction](row, col);
  if (newRow < 0 || newRow >= map.length || newCol < 0 || newCol >= map[0].length) {
    return [null, null];
  }
  return [newRow, newCol];
};

const guardTurn = (dir) => {
  switch (dir) {
    case DIR.UP:
      return DIR.RIGHT;
    case DIR.RIGHT:
      return DIR.DOWN;
    case DIR.DOWN:
      return DIR.LEFT;
    case DIR.LEFT:
      return DIR.UP;
  }
};

const printMatrix = (matrix) => {
  matrix.forEach((row, i) => {
    console.log(row.join(''), i);
  });
};

const solution_part1 = (input) => {
  const rows = input.split('\n');
  let map = [];
  let ret = 1;
  let guardRow = null;
  let guardCol = null;
  let direction = DIR.UP;

  rows.forEach((row, i) => {
    const parts = row.split('');
    if (row.includes(DIR_SYMBOLS[DIR.UP])) {
      parts.forEach((part, j) => {
        if (part === DIR_SYMBOLS[DIR.UP]) {
          guardRow = i;
          guardCol = j;
        }
      });
    }
    map.push(parts);
  });
  console.log('Guard at: ', guardRow, guardCol);
  printMatrix(map);

  // make a blank map that is the same width and height as the input
  let paths = Array(rows.length)
    .fill()
    .map(() => Array(rows[0].length).fill('_'));
  paths[guardRow][guardCol] = DIR_SYMBOLS[direction];

  while (true) {
    const [newRow, newCol] = stepForward(map, guardRow, guardCol, direction);
    if (newRow === null) {
      break;
    }

    if (map[newRow][newCol] === OBSTACLE) {
      direction = guardTurn(direction);
      paths[newRow][newCol] = '#';
      continue;
    }

    guardRow = newRow;
    guardCol = newCol;
    if (paths[guardRow][guardCol] === '_') {
      paths[guardRow][guardCol] = DIR_SYMBOLS[direction];
      ret++;
    }
  }

  printMatrix(paths);

  return ret;
};

const solution_part2 = (input) => {
  const rows = input.split('\n');
  let map = [];
  let ret = 1;
  let ogGuardRow = null;
  let ogGuardCol = null;
  let guardRow = null;
  let guardCol = null;
  let direction = DIR.UP;

  rows.forEach((row, i) => {
    const parts = row.split('');
    if (row.includes(DIR_SYMBOLS[DIR.UP])) {
      parts.forEach((part, j) => {
        if (part === DIR_SYMBOLS[DIR.UP]) {
          guardRow = i;
          guardCol = j;
          ogGuardRow = i;
          ogGuardCol = j;
        }
      });
    }
    map.push(parts);
  });
  console.log('Guard at: ', guardRow, guardCol);
  // printMatrix(map);

  // make a blank map that is the same width and height as the input
  let paths = Array(rows.length)
    .fill()
    .map(() => Array(rows[0].length).fill('_'));
  paths[guardRow][guardCol] = DIR_SYMBOLS[direction];

  let obstruction_cnt = 0;

  map.forEach((row, i) => {
    row.forEach((cell, j) => {
      const obstructions = {};
      const mapWithObstructions = _.cloneDeep(map);
      if (cell !== '.') {
        return;
      }
      mapWithObstructions[i][j] = OBSTACLE;
      while (true) {
        const [newRow, newCol] = stepForward(mapWithObstructions, guardRow, guardCol, direction);
        if (newRow === null) {
          break;
        }

        if (mapWithObstructions[newRow][newCol] === OBSTACLE) {
          const key = `${newRow}-${newCol}`;
          // Been here before
          if (obstructions[key]?.includes(direction)) {
            obstruction_cnt++;
            break;
          }
          if (!obstructions[key]) {
            obstructions[key] = [];
          }
          obstructions[key].push(direction);
          direction = guardTurn(direction);
          paths[newRow][newCol] = '#';
          continue;
        }

        guardRow = newRow;
        guardCol = newCol;
        if (paths[guardRow][guardCol] === '_') {
          paths[guardRow][guardCol] = DIR_SYMBOLS[direction];
          ret++;
        }
      }
      //reset guard position
      guardRow = ogGuardRow;
      guardCol = ogGuardCol;
      direction = DIR.UP;
    });
  });

  return obstruction_cnt;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.time('part2');
console.log('Part 2 Answer: ', solution_part2(input2));
console.timeEnd('part2');
