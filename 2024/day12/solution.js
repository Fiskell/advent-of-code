const fs = require('fs');
const { set } = require('lodash');
const path = require('path');

const findArea = (matrix, mask, char, row, col) => {
  let area = [];
  let queue = [];
  queue.push([row, col]);
  while (queue.length > 0) {
    let [r, c] = queue.shift();
    if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
      continue;
    }
    if (matrix[r][c] !== char) {
      continue;
    }
    if (matrix[r][c] === char && mask[r][c] === '.') {
      area.push([r, c]);
      mask[r][c] = '#';
      // matrix[r][c] = '.';
      queue.push([r - 1, c]);
      queue.push([r + 1, c]);
      queue.push([r, c - 1]);
      queue.push([r, c + 1]);
    }
  }
  return [area, mask];
};

const getFenceAmounts = (matrix, _mask, char, row, col) => {
  console.log(matrix);
  let ret = 0;
  let [areaPts, mask] = findArea(matrix, _mask, char, row, col);
  console.log(char, row, col, areaPts);
  areaPts.forEach((pts) => {
    // Top
    if (pts[0] - 1 < 0) {
      console.log(char, pts[0], pts[1], `top`);
      ret++;
    }
    // Bottom
    if (pts[0] + 1 >= matrix.length) {
      console.log(char, pts[0], pts[1], `bottom`);
      ret++;
    }
    // Max Left
    if (pts[1] - 1 < 0) {
      console.log(char, pts[0], pts[1], `max left`);
      ret++;
    }
    // Max Right
    if (pts[1] + 1 >= matrix[0].length) {
      console.log(char, pts[0], pts[1], `max right`);
      ret++;
    }
    // Above
    if (pts[0] - 1 >= 0 && matrix[pts[0] - 1][pts[1]] !== char) {
      console.log(char, pts[0], pts[1], `above`);
      ret++;
    }
    // Below
    if (pts[0] + 1 < matrix.length && matrix[pts[0] + 1][pts[1]] !== char) {
      console.log(char, pts[0], pts[1], `below`);
      ret++;
    }
    // Left
    if (pts[1] - 1 >= 0 && matrix[pts[0]][pts[1] - 1] !== char) {
      console.log(char, pts[0], pts[1], `left`);
      ret++;
    }
    // Right
    if (pts[1] + 1 < matrix[0].length && matrix[pts[0]][pts[1] + 1] !== char) {
      console.log(char, pts[0], pts[1], `right`, matrix[pts[0]][pts[1] + 1]);
      ret++;
    }
  });

  return [ret, areaPts.length, mask];
};

const solution_part1 = (input, useHasSeen) => {
  let rows = input.split('\n');
  let matrix = [];
  let total = 0;

  rows.forEach((row, index) => {
    let cols = row.split('');
    matrix.push(cols);
  });

  let mask = new Array(matrix.length).fill('.').map(() => new Array(matrix[0].length).fill('.'));
  rows.forEach((row, index) => {
    let cols = matrix[index];
    cols.forEach((col, colIndex) => {
      if (mask[index][colIndex] === '.') {
        [fenceNeeded, area, mask] = getFenceAmounts(matrix, mask, col, index, colIndex);
        console.log(col, index, colIndex, `fence: `, fenceNeeded, mask);
        total += fenceNeeded * area;
      }
    });
  });

  return total;
};

const getFenceSidesAndArea = (matrix, _mask, char, row, col) => {
  let [areaPts, mask] = findArea(matrix, _mask, char, row, col);
  let sides = new Set();

  // Sort points for consistent processing
  areaPts.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));

  // Create maps for quick lookup
  const pointMap = new Set(areaPts.map(([r, c]) => `${r},${c}`));

  // Check each point for sides
  areaPts.forEach(([r, c]) => {
    // Check left side
    if (c === 0 || !pointMap.has(`${r},${c - 1}`)) {
      sides.add(`left-${r}-${c}`);
    }

    // Check right side
    if (c === matrix[0].length - 1 || !pointMap.has(`${r},${c + 1}`)) {
      sides.add(`right-${r}-${c}`);
    }

    // Check top side
    if (r === 0 || !pointMap.has(`${r - 1},${c}`)) {
      sides.add(`top-${r}-${c}`);
    }

    // Check bottom side
    if (r === matrix.length - 1 || !pointMap.has(`${r + 1},${c}`)) {
      sides.add(`bottom-${r}-${c}`);
    }
  });

  // Merge adjacent sides
  const mergedSides = new Set();
  const processed = new Set();

  const mergeSides = (direction) => {
    areaPts.forEach(([r, c]) => {
      const key = `${r},${c}`;
      if (processed.has(`${direction}-${key}`)) return;

      const sideKey = `${direction}-${r}-${c}`;
      if (sides.has(sideKey)) {
        let start = [r, c];
        let current = [r, c];
        let next;

        // Find continuous side
        while (true) {
          if (direction === 'left' || direction === 'right') {
            next = [current[0] + 1, current[1]];
          } else {
            next = [current[0], current[1] + 1];
          }

          const nextKey = `${direction}-${next[0]}-${next[1]}`;
          if (!sides.has(nextKey) || !pointMap.has(`${next[0]},${next[1]}`)) {
            break;
          }
          current = next;
          processed.add(`${direction}-${next[0]},${next[1]}`);
        }

        if (start[0] !== current[0] || start[1] !== current[1]) {
          mergedSides.add(`${direction}-${start[0]}-${start[1]}-${current[0]}-${current[1]}`);
        } else {
          mergedSides.add(sideKey);
        }
      }
    });
  };

  mergeSides('left');
  mergeSides('right');
  mergeSides('top');
  mergeSides('bottom');

  return [mergedSides, areaPts.length, mask];
};

const solution_part2 = (input) => {
  let rows = input.split('\n');
  let matrix = [];
  let total = 0;

  rows.forEach((row, index) => {
    let cols = row.split('');
    matrix.push(cols);
  });

  let mask = new Array(matrix.length).fill('.').map(() => new Array(matrix[0].length).fill('.'));
  rows.forEach((row, index) => {
    let cols = matrix[index];
    cols.forEach((col, colIndex) => {
      if (mask[index][colIndex] === '.') {
        [sides, area, mask] = getFenceSidesAndArea(matrix, mask, col, index, colIndex);
        console.log('----', col, `fence: `, sides, sides.size, area);
        total += sides.size * area;
      }
    });
  });

  return total;
};

// const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample3.txt'), 'utf8');
const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.time('Part 2');
console.log('Part 2 Answer: ', solution_part2(input2));
console.timeEnd('Part 2');

module.exports = {
  solution_part1,
  solution_part2,
};
