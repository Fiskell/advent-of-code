const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const EMPTY = '.';

const travel = (matrix, newIndex, i, j, count, hasSeen) => {
  if (hasSeen !== null && hasSeen.includes(`${i}-${j}`)) {
    return [count, hasSeen];
  }

  if (matrix[i][j] === 9) {
    if (hasSeen !== null) {
      hasSeen.push(`${i}-${j}`);
    }
    return [1, hasSeen];
  }

  if (matrix[i][j] === EMPTY) {
    return [count, hasSeen];
  }

  let up = 0;
  let down = 0;
  let left = 0;
  let right = 0;

  // Up
  if (i - 1 >= 0 && matrix[i - 1][j] === newIndex) {
    let upRet = travel(matrix, newIndex + 1, i - 1, j, count, hasSeen);
    up = upRet[0];
    hasSeen = upRet[1];
  }

  // Down
  if (i + 1 < matrix.length && matrix[i + 1][j] === newIndex) {
    let downRet = travel(matrix, newIndex + 1, i + 1, j, count, hasSeen);
    down = downRet[0];
    hasSeen = downRet[1];
  }

  // Left
  if (j - 1 >= 0 && matrix[i][j - 1] === newIndex) {
    let leftRet = travel(matrix, newIndex + 1, i, j - 1, count, hasSeen);
    left = leftRet[0];
    hasSeen = leftRet[1];
  }

  // Right
  if (j + 1 < matrix[0].length && matrix[i][j + 1] === newIndex) {
    let rightRet = travel(matrix, newIndex + 1, i, j + 1, count, hasSeen);
    right = rightRet[0];
    hasSeen = rightRet[1];
  }

  return [up + down + left + right, hasSeen];
};

const solution_part1 = (input, useHasSeen) => {
  const rows = input.split('\n');
  let ret = 0;
  let matrix = [];
  let trailHeads = [];
  rows.forEach((row, i) => {
    const cols = row.split('').map((col) => parseInt(col));
    cols.forEach((col, j) => {
      if (col === 0) {
        trailHeads.push([i, j]);
      }
    });
    matrix.push(cols);
  });

  const totalTrails = [];
  trailHeads.forEach((trailHead) => {
    const [numTrails, seen] = travel(matrix, 1, trailHead[0], trailHead[1], 0, useHasSeen ? [] : null);
    totalTrails.push(numTrails);
    // console.log('Num Trails: ', numTrails);
  });

  // console.log('Total Trails: ', totalTrails);

  return totalTrails.reduce((acc, curr) => acc + curr, 0);
};

const solution_part2 = (input) => {
  return solution_part1(input, false);
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.time('Part 2');
console.log('Part 2 Answer: ', solution_part2(input2));
console.timeEnd('Part 2');

module.exports = {
  solution_part1,
  solution_part2,
};
