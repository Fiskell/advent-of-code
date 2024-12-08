const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const getAntiNodes = (a1, a2, w, h) => {
  /*
  1,8
  2,5

  1-2 and 8-5 = -1, 3

  2-1 and 5-8 = 1, -3

  0, 11 
  3, 2 
  */
  const x = a1[0] - a2[0];
  const y = a1[1] - a2[1];
  const anti1 = [a1[0] + x, a1[1] + y];
  const anti2 = [a2[0] - x, a2[1] - y];
  let ret = [];
  if (anti1[0] >= 0 && anti1[0] < w && anti1[1] >= 0 && anti1[1] < h) {
    ret.push(anti1);
  }

  if (anti2[0] >= 0 && anti2[0] < w && anti2[1] >= 0 && anti2[1] < h) {
    ret.push(anti2);
  }
  return ret;
};
const printMatrix = (matrix) => {
  matrix.forEach((row, i) => {
    console.log(row.join(''), i);
  });
};

const solution_part1 = (input) => {
  let coords = {};
  let antinodes = [];
  const rows = input.split('\n');
  let ret = 0;
  rows.forEach((row, i) => {
    const parts = row.split('');
    parts.forEach((part, j) => {
      if (part !== '.') {
        if (!coords[part]) {
          coords[part] = [];
        }
        coords[part].push([i, j]);
      }
    });
  });

  Object.keys(coords).forEach((f) => {
    for (let i = 0; i < coords[f].length; i++) {
      for (let j = i + 1; j < coords[f].length; j++) {
        const an = getAntiNodes(coords[f][i], coords[f][j], rows.length, rows[0].length);
        // console.log(an);
        antinodes = [...antinodes, ...an];
      }
    }
  });

  // fill matrix with '.' for width and height
  const matrix = new Array(rows.length).fill('.').map(() => new Array(rows[0].length).fill('.'));
  console.log(antinodes, coords);
  antinodes.forEach((an) => {
    console.log('an', an);
    if (matrix[an[0]][an[1]] !== '#') {
      matrix[an[0]][an[1]] = '#';
      ret++;
    }
  });
  printMatrix(matrix);

  return ret;
};

const solution_part2 = (input) => {
  const rows = input.split('\n');
  let ret = 0;
  rows.forEach((row) => {
    const parts = row.split(' ');
  });
  return ret;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 2 Answer: ', solution_part2(input2));
