const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const getAntiNodes = (a1, a2, w, h) => {
  const ret = [];

  // For each point in the grid
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      // Always include the original antenna points
      if ((i === a1[0] && j === a1[1]) || (i === a2[0] && j === a2[1])) {
        ret.push([i, j]);
        continue;
      }

      const [y1, x1] = a1;
      const [y2, x2] = a2;
      const x3 = j;
      const y3 = i;

      if ((y2 - y1) * (x3 - x1) === (y3 - y1) * (x2 - x1)) {
        ret.push([i, j]);
      }
    }
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
        antinodes = [...antinodes, ...an];
      }
    }
  });

  // fill matrix with '.' for width and height
  const matrix = new Array(rows.length).fill('.').map(() => new Array(rows[0].length).fill('.'));
  antinodes.forEach((an) => {
    if (matrix[an[0]][an[1]] !== '#') {
      matrix[an[0]][an[1]] = '#';
      ret++;
    }
  });
  printMatrix(matrix);

  return ret;
};

const solution_part2 = (input) => {
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
    let freqNodes = [];
    for (let i = 0; i < coords[f].length; i++) {
      for (let j = i + 1; j < coords[f].length; j++) {
        const an = getAntiNodes(coords[f][i], coords[f][j], rows.length, rows[0].length);
        freqNodes = [...freqNodes, ...an];
      }
    }
    antinodes = [...antinodes, ...freqNodes];
  });

  // fill matrix with '.' for width and height
  const matrix = new Array(rows.length).fill('.').map(() => new Array(rows[0].length).fill('.'));
  antinodes.forEach((an) => {
    // console.log('an', an);
    if (matrix[an[0]][an[1]] !== '#') {
      matrix[an[0]][an[1]] = '#';
      ret++;
    }
  });
  Object.keys(coords).forEach((f) => {
    coords[f].forEach((coord) => {
      matrix[coord[0]][coord[1]] = f;
    });
  });
  // printMatrix(matrix);

  return ret;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));

module.exports = {
  solution_part1,
  solution_part2,
};
