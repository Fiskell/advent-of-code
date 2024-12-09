const fs = require('fs');
const path = require('path');
const _ = require('lodash');

const shiftMemory = (memory) => {
  let right = memory.length - 1;
  for (let left = 0; left < memory.length; left++) {
    // console.log(left, right);
    if (left > right) {
      break;
    }
    // console.log(memory.join(''));
    if (memory[left] === '.') {
      while (true) {
        if (memory[right] !== '.') {
          memory[left] = memory[right];
          memory[right] = '.';
          break;
        }
        right--;
        if (right < left) {
          break;
        }
      }
      continue;
    }
  }

  // console.log('Memory: \n', memory);

  return memory;
};

const sum = (memory) => {
  let ret = 0;
  for (let i = 0; i < memory.length; i++) {
    if (memory[i] !== '.') {
      ret += parseInt(memory[i]) * i;
    }
  }
  return ret;
};

const solution_part1 = (input) => {
  const parts = input.split('');
  let ret = 0;
  let out = [];
  let id = 0;
  for (let i = 0; i < parts.length; i++) {
    const isFile = i % 2 === 0;
    const isFreeSpace = i % 2 === 1;
    const val = parts[i];

    if (isFile) {
      out = [...out, ...Array(parseInt(val)).fill(id)];
      id++;
    } else {
      out = [...out, ...Array(parseInt(val)).fill('.')];
    }
    // console.log(out);
    // console.log('out:', out.join(''));
  }

  out = shiftMemory(out);
  console.log(out.join(''));
  return sum(out);
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
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 1 Answer: ', solution_part1(input));

const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample2.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
console.log('Part 2 Answer: ', solution_part2(input2));

module.exports = {
  solution_part1,
  solution_part2,
};
