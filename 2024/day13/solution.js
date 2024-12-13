const fs = require('fs');
const { set } = require('lodash');
const path = require('path');

const solveGame = (game, p2) => {
  const parts = game.split('\n');
  const AParts = parts[0].split(' ').map((x) => x.replace(/,/g, '').replace(/X\+/g, '').replace(/Y\+/g, ''));
  const BParts = parts[1].split(' ').map((x) => x.replace(/,/g, '').replace(/X\+/g, '').replace(/Y\+/g, ''));
  const CParts = parts[2].split(' ').map((x) => x.replace(/,/g, '').replace(/X\=/g, '').replace(/Y\=/g, ''));
  const A_X = parseInt(AParts[2]);
  const A_Y = parseInt(AParts[3]);
  const B_X = parseInt(BParts[2]);
  const B_Y = parseInt(BParts[3]);
  let C_X = parseInt(CParts[1]);
  let C_Y = parseInt(CParts[2]);
  if (p2) {
    C_X *= 10000000000000;
    C_Y *= 10000000000000;
  }

  console.log(A_X, A_Y, B_X, B_Y, C_X, C_Y);

  let MAX_ITERATIONS = 100;
  if (p2) {
    MAX_ITERATIONS = Math.floor(C_X / A_X);
  }
  const A_BUTTON_COST = 3;
  const B_BUTTON_COST = 1;
  const solve = (ax, bx, targetx, ay, by, targety) => {
    let ret = [];
    for (let a = 0; a < MAX_ITERATIONS; a++) {
      // Go down a since we want to minimize a
      const remainder = targetx - a * ax;
      if (remainder % bx === 0) {
        const b = remainder / bx;
        if (ay * a + by * b === targety) {
          console.log('Found solution: ', a, b);
          return [a, b];
        }
      }
    }
    return [];
  };

  const sol = solve(A_X, B_X, C_X, A_Y, B_Y, C_Y);
  if (sol.length > 0) {
    return sol[0] * A_BUTTON_COST + sol[1] * B_BUTTON_COST;
  }
  return 0;
};

const solution_part1 = (input, useHasSeen) => {
  let games = input.split('\n\n');
  let totalTokens = 0;
  games.forEach((game, index) => {
    totalTokens += solveGame(game);
    console.log('Total Tokens: ', totalTokens);
  });

  return totalTokens;
};

const solution_part2 = (input) => {
  let games = input.split('\n\n');
  let totalTokens = 0;
  games.forEach((game, index) => {
    totalTokens += solveGame(game, true);
    console.log('Total Tokens: ', totalTokens);
  });

  return totalTokens;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample3.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.time('Part 2');
console.log('Part 2 Answer: ', solution_part2(input2));
console.timeEnd('Part 2');

module.exports = {
  solution_part1,
  solution_part2,
};
