const fs = require('fs');
const path = require('path');

const solution_part1 = (input) => {
  const rows = input.split('\n');
  let ret = 0;
  rows.forEach((row) => {
    const parts = row.split(' ');
  });
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

const input = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')
console.log('Part 1 Answer: ', solution_part1(input));

// const input2 = fs.readFileSync(path.resolve(__dirname, 'sample.txt'), 'utf8');
// const input2 = fs.readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8');
// console.log('Part 2 Answer: ', solution_part2(input2));
